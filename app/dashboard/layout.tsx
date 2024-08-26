import DashboardNavbar from '@/components/dashboard/dashboard-navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-gray-900'>
      <div className='mt-[75px]'>
        <DashboardNavbar />
      </div>
      <div className='min-h-screen w-full'>{children}</div>
    </div>
  );
};

export default layout;
