import { GetAllUsersCountAction } from '@/actions/user-auth';
import { GetAllProductsCountAction } from '@/actions/product-actions';
import { auth } from '@/auth';
import Link from 'next/link';
import DashboardSomary from '@/components/dashboard/dashboard-somary';
import LastUsers from '@/components/dashboard/users/last-users';
import LastProducts from '@/components/dashboard/products/last-products';
import LastOrders from '@/components/dashboard/orders/last-orders';

const Dashboard = async () => {
  const session = await auth();
  if (!session || session?.user?.userRole !== 'ADMIN') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
        <h1 className='mt-5 text-center text-2xl font-bold text-black dark:text-white'>
          🤷‍♂️🤷‍♂️🤷‍♂️ شما به این صفحه دسترسی ندارید
        </h1>
        <Link
          href='/'
          className='mt-5 rounded-full bg-primary px-4 py-2 text-white'
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const allUsersCount = await GetAllUsersCountAction();
  const allProductsCount = await GetAllProductsCountAction();

  return (
    <div className='container flex w-[100%] flex-col gap-y-4'>
      <div className='flex flex-col items-center justify-center gap-y-4'>
        <DashboardSomary
          allUsersCount={allUsersCount}
          allProductsCount={allProductsCount}
        />
        <span className='text-center text-xl font-semibold text-gray-400 dark:text-primary'>
          آخرین محصولات ثبت شده
        </span>
        <LastProducts />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-center justify-center gap-y-4'>
          <span className='text-center text-xl font-semibold text-gray-400 dark:text-primary'>
            آخرین کاربران ثبت شده
          </span>
          <LastUsers />
        </div>
        <div className='flex flex-col items-center justify-center gap-y-4'>
          <span className='text-center text-xl font-semibold text-gray-400 dark:text-primary'>
            در انتظار پرداخت
          </span>
          <LastOrders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
