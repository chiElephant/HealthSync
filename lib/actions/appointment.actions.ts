import { ID } from 'node-appwrite';
import {
  DATABASE_ID,
  databases,
  APPOINTMENT_COLLECTION_ID,
} from '../appwrite.config';
import { parseStringify } from '../utils';

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
