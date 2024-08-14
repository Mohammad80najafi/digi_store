import DashboardNavbar from '@/components/dashboard/dashboard-navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen flex-col bg-white dark:bg-gray-900'>
      <div className='mt-2'>
        <DashboardNavbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
