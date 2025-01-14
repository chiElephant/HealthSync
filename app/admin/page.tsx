import Link from 'next/link';
import Image from 'next/image';
import StatCard from '@/components/StatCard';

const Admin = () => {
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
            count={10}
            label='Scheduled Appointments'
            icon='/assets/icons/appointments.svg'
          />
          <StatCard
            type='pending'
            count={3}
            label='Pending Appointments'
            icon='/assets/icons/pending.svg'
          />
          <StatCard
            type='cancelled'
            count={1}
            label='Canceled Appointments'
            icon='/assets/icons/cancelled.svg'
          />
        </section>
      </main>
    </div>
  );
};

export default Admin;
