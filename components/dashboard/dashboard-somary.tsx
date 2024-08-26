'use client';
import Link from 'next/link';
import { TbReorder } from 'react-icons/tb';
import { useAppSelector } from '@/redux/redux-hooks';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import LastUsers from '@/components/dashboard/users/last-users';

const DashboardSomary = ({ allUsersCount, allProductsCount }: any) => {
  const orders = useAppSelector((state) => state.product);
  const v = orders?.products?.length;
  return (
    <div className='mt-5 grid min-w-[80%] grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16'>
      {/* users box */}
      <div className='flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-500 lg:flex-col'>
        <Link
          href='/dashboard/users'
          className='flex w-full items-center justify-between gap-4 px-8 py-4 text-white'
        >
          <FaUsers className='text-4xl' />
          <span className='text-xl font-bold'>کاربران : {allUsersCount}</span>
        </Link>
      </div>
      {/* orders box */}
      <div className='flex w-full cursor-pointer items-center justify-center rounded-md bg-green-500 lg:flex-col'>
        <Link
          href='/dashboard/orders'
          className='flex w-full items-center justify-between gap-4 px-8 py-4 text-white'
        >
          <TbReorder className='text-4xl' />
          <span className='text-xl font-bold'>کل سفارشات : {v}</span>
        </Link>
      </div>
      {/* settings box */}
      <div className='flex w-full cursor-pointer items-center justify-center rounded-md bg-red-500 lg:flex-col'>
        <Link
          href='/dashboard/products'
          className='flex w-full items-center justify-between gap-4 px-8 py-4 text-white'
        >
          <MdOutlineProductionQuantityLimits className='text-4xl' />
          <span className='text-xl font-bold'>
            کل محصولات : {allProductsCount}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSomary;
