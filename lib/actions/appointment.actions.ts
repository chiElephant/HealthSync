'use server';

import { ID, Query } from 'node-appwrite';
import {
  DATABASE_ID,
  databases,
  APPOINTMENT_COLLECTION_ID,
  messaging,
} from '../appwrite.config';
import { formatDateTime, parseStringify } from '../utils';
import { Appointment } from '@/types/appwrite.types';
import { revalidatePath } from 'next/cache';

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAllAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      canceledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === 'scheduled') {
          acc.scheduledCount += 1;
        } else if (appointment.status === 'pending') {
          acc.pendingCount += 1;
        } else if (appointment.status === 'canceled') {
          acc.canceledCount += 1;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  type,
  userId,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error('Appointment Not Found');
    }

    const smsMessage = `
    Hi, it's HealthSync.
    ${
      type === 'schedule' ?
        `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}`
      : `We regret to inform you that your appointment has been canceled for the following reason: ${appointment.cancellationReason}`
    }`;

    await sendSMSNotification(userId, smsMessage);
    revalidatePath('/admin');
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    console.log('Content', content);
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error(error);
  }
};
