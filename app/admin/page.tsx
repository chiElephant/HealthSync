import Link from 'next/link';
import Image from 'next/image';
import StatCard from '@/components/StatCard';
import { getAllAppointments } from '@/lib/actions/appointment.actions';

const Admin = async () => {
  const appointments = await getAllAppointments();
  return (
    <div className='mx-auto flex flex-col max-w-7xl space-y-14'>
      <header className='admin-header'>
        <Link
          href='/'
          className='cursor-pointer'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='Logo'
            height={32}
            width={162}
            className='h-8 w-fit'
          />
        </Link>
        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Manage new and existing appointments.</p>
        </section>
        <section className='admin-stat'>
          <StatCard
            type='appointments'
            count={appointments.scheduledCount}
            label='Scheduled Appointments'
            icon='/assets/icons/appointments.svg'
          />
          <StatCard
            type='pending'
            count={appointments.pendingCount}
            label='Pending Appointments'
            icon='/assets/icons/pending.svg'
          />
          <StatCard
            type='cancelled'
            count={appointments.cancelledCount}
            label='Canceled Appointments'
            icon='/assets/icons/cancelled.svg'
          />
        </section>
      </main>
    </div>
  );
};

export default Admin;
