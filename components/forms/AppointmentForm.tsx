'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { getAppointmentSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import {
  createAppointment,
  updateAppointment,
} from '@/lib/actions/appointment.actions';
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import { Appointment } from '@/types/appwrite.types';

type AppointmentFormProps = {
  type: 'create' | 'cancel' | 'schedule';
  patientId: string;
  userId: string;
  appointment: Appointment;
  setOpen: (open: boolean) => void;
};

const AppointmentForm = ({
  type,
  patientId,
  userId,
  appointment,
  setOpen,
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : '',
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : '',
      note: appointment ? appointment.note : '',
      cancellationReason: appointment.cancellationReason || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;

    switch (type) {
      case 'schedule':
        status = 'scheduled';
        break;
      case 'cancel':
        status = 'canceled';
        break;
      default:
        status = 'pending';
        break;
    }

    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment && setOpen) {
          setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  let buttonLabel;

  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'create':
      buttonLabel = 'Create Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 flex-1'>
        {type === 'create' && (
          <section className='mb-12 space-y-4'>
            <h1 className='header'>New Appointment</h1>
            <p className='text-dark-700'>Schedule a visit now</p>
          </section>
        )}

        {type !== 'cancel' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='primaryPhysician'
              label='Doctor'
              placeholder='Select a doctor'>
              {Doctors.map((dr) => (
                <SelectItem
                  key={dr.name}
                  value={dr.name}>
                  <div className='flex cursor-pointer items-center gap-2'>
                    <Image
                      src={dr.image}
                      width={32}
                      height={32}
                      alt={'doctor'}
                      className={'rounded-full border border-dark-500'}
                    />
                    <p>{dr.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected Appointment Date'
              showTimeSelect
              dateFormat='MM/dd/yyyy - h:mm aa'
            />

            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='reason'
                label='Reason for Appointment'
                placeholder='Enter reason for appointment'
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='note'
                label='Notes'
                placeholder='Enter additional notes'
              />
            </div>
          </>
        )}
        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label='Reason for Cancellation'
            placeholder='Enter reason for cancellation'
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
