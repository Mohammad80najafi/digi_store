import {
  GetAllUsersCountAction,
  GetAllAdminUsersCount,
  GetAllUsersAction,
} from '@/actions/user-auth';
import { auth } from '@/auth';
import Link from 'next/link';
import LastUsers from '@/components/dashboard/users/last-users';

const Dashboard = async () => {
  const session = await auth();
  if (!session || session?.user?.userRole !== 'ADMIN') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
        <h1 className='mt-5 text-center text-2xl font-bold text-black dark:text-white'>
          🤷‍♂️🤷‍♂️🤷‍♂️ شما به این صفحه دسترسی ندارید
        </h1>
        <Link href='/'>
          <button className='mt-5 rounded-full bg-primary px-4 py-2 text-white'>
            بازگشت به صفحه اصلی
          </button>
        </Link>
      </div>
    );
  }

  const allUsersCount = await GetAllUsersCountAction();
  const allAdminsCount = await GetAllAdminUsersCount();
  const AllUsers = await GetAllUsersAction();

  return (
    <div className='container flex w-[100%] flex-col items-center justify-center'>
      <div className='min-w-fitw-[80%] mt-5 grid grid-cols-1 place-items-center gap-16 md:grid-cols-2 lg:grid-cols-3'>
        {/* users box */}
        <div className='flex cursor-pointer flex-col items-center justify-center rounded-md bg-blue-500 px-20 py-4'>
          <Link href='/dashboard/users' className='text-white'>
            <h1 className='block divide-y-2 divide-solid divide-gray-800 border-b-2 py-2 text-center text-xl font-bold'>
              کاربران
            </h1>
            <div className='flex flex-col items-center justify-center gap-4 py-5 text-slate-200'>
              <span>کاربران : {allUsersCount}</span>
              <span>ادمین ها: {allAdminsCount}</span>
            </div>
          </Link>
        </div>
        {/* orders box */}
        <div className='flex cursor-pointer flex-col items-center justify-center rounded-md bg-green-500 px-20 py-4'>
          <Link href='/dashboard/users' className='text-white'>
            <h1 className='divide-y-2 divide-gray-800 border-b-2 py-2 text-center text-xl font-bold'>
              سفارشات
            </h1>
            <div className='flex flex-col items-center justify-center gap-4 py-5 text-slate-200'>
              <span>کل سفارشات : 12</span>
              <span>تحویل شده: 3</span>
            </div>
          </Link>
        </div>
        {/* settings box */}
        <div className='flex cursor-pointer flex-col items-center justify-center rounded-md bg-red-500 px-20 py-4'>
          <Link href='/dashboard/users' className='text-white'>
            <h1 className='divide-y-2 divide-gray-800 border-b-2 py-2 text-center text-xl font-bold'>
              کل محصولات
            </h1>
            <div className='flex flex-col items-center justify-center gap-4 py-5 text-slate-200'>
              <span>کل محصولات : 12</span>
              <span>دسته بندی ها: 3</span>
            </div>
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        {/* last users  */}
        <div className='flex items-start justify-center'>
          <div className='flex flex-col items-center justify-center gap-4 py-5 text-slate-200'>
            <span className='text-xl font-bold text-black'>
              {' '}
              آخرین کاربران ثبت نام شده :
            </span>
            <LastUsers users={AllUsers} />
          </div>
        </div>
        {/* last producrs */}
        <div></div>
        {/* last orders  */}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
