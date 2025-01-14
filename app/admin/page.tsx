import StatCard from '@/components/StatCard';
import DataTable from '@/components/table/DataTable';
import { Payment, columns } from '@/components/table/columns';
import { getAllAppointments } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

const Admin = async () => {
  const data = await getData();
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
        <DataTable
          columns={columns}
          data={data}
          // data={appointments.documents}
        />
      </main>
    </div>
  );
};

export default Admin;
