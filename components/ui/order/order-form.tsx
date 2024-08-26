'use client';
import { useAppSelector } from '@/redux/redux-hooks';
import Link from 'next/link';

const OrderForm = () => {
  const cost = useAppSelector((state) => state?.product.totalPrice);

  return (
    <div>
      <form className='flex flex-col gap-4 rounded-md bg-white p-4 dark:bg-gray-800'>
        <div className='flex w-full items-center justify-between gap-4'>
          <div className='flex w-full flex-col items-start justify-start gap-1'>
            <label
              htmlFor='name'
              className='text-md font-semibold text-gray-700 dark:text-gray-200'
            >
              نام
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='نام گیرنده سفارش ...'
              className='w-full rounded-md border-2 border-gray-300 bg-cyan-100/50 p-2 text-sm font-semibold text-gray-700 placeholder:text-gray-600 dark:border-gray-200 dark:bg-gray-400 dark:text-white dark:placeholder:text-white'
            />
          </div>
          <div className='flex w-full flex-col items-start justify-start gap-1'>
            <label
              className='text-md font-semibold text-gray-700 dark:text-gray-200'
              htmlFor='lastname'
            >
              نام خانوادگی{' '}
            </label>
            <input
              type='text'
              id='lastname'
              name='lastname'
              placeholder='نام خانوادگی گیرنده سفارش'
              className='w-full rounded-md border-2 border-gray-300 bg-cyan-100/50 p-2 text-sm font-semibold text-gray-700 placeholder:text-gray-600 dark:border-gray-200 dark:bg-gray-400 dark:text-white dark:placeholder:text-white'
            />
          </div>
        </div>
        <div className='flex w-full items-center justify-between gap-4'>
          <div className='flex w-full flex-col items-start justify-start gap-1'>
            <label
              htmlFor='name'
              className='text-md font-semibold text-gray-700 dark:text-gray-200'
            >
              استان
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='استان گیرنده سفارش'
              className='w-full rounded-md border-2 border-gray-300 bg-cyan-100/50 p-2 text-sm font-semibold text-gray-700 placeholder:text-gray-600 dark:border-gray-200 dark:bg-gray-400 dark:text-white dark:placeholder:text-white'
            />
          </div>
          <div className='flex w-full flex-col items-start justify-start gap-1'>
            <label
              className='text-md font-semibold text-gray-700 dark:text-gray-200'
              htmlFor='lastname'
            >
              شهر
            </label>
            <input
              type='text'
              id='lastname'
              name='lastname'
              placeholder='شهر گیرنده سفارش'
              className='w-full rounded-md border-2 border-gray-300 bg-cyan-100/50 p-2 text-sm font-semibold text-gray-700 placeholder:text-gray-600 dark:border-gray-200 dark:bg-gray-400 dark:text-white dark:placeholder:text-white'
            />
          </div>
        </div>
        <div className='flex flex-col items-start justify-between gap-2'>
          <label
            htmlFor='address'
            className='text-md font-semibold text-gray-700 dark:text-gray-200'
          >
            آدرس
          </label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='آدرس گیرنده سفارش'
            className='w-full rounded-md border-2 border-gray-300 bg-cyan-100/50 p-2 text-sm font-semibold text-gray-700 placeholder:text-gray-600 dark:border-gray-200 dark:bg-gray-400 dark:text-white dark:placeholder:text-white'
          />
        </div>
        <div className='flex flex-col items-start justify-between gap-2'>
          <label
            htmlFor='address'
            className='text-md font-semibold text-gray-700 dark:text-gray-200'
          >
            کد پستی
          </label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='کد پستی گیرنده سفارش'
            className='w-full rounded-md border-2 border-gray-300 bg-cyan-100/50 p-2 text-sm font-semibold text-gray-700 placeholder:text-gray-600 dark:border-gray-200 dark:bg-gray-400 dark:text-white dark:placeholder:text-white'
          />
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-md font-semibold text-gray-700 dark:text-gray-200'>
            مجموع پرداخت :
          </span>
          <span className='text-md font-semibold text-gray-700 dark:text-gray-200'>
            $ {cost}
          </span>
        </div>
        <Link
          href='/'
          className='w-full cursor-pointer rounded bg-primary py-2 text-center font-semibold text-white'
        >
          ثبت سفارش
        </Link>
      </form>
    </div>
  );
};

export default OrderForm;
