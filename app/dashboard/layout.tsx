import DashboardNavbar from '@/components/dashboard/dashboard-navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen justify-between'>
      <div>{children}</div>
      <div>
        <DashboardNavbar />
      </div>
    </div>
  );
};

export default layout;
