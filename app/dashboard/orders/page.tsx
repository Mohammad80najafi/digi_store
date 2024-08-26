'use client';

import { useAppSelector, useAppDispatch } from '@/redux/redux-hooks';
import Image from 'next/image';

const Orders = () => {
  const products = useAppSelector((state) => state.product.products);
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full p-1.5 align-middle'>
          <div className='overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                  >
                    عکس محصول
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                  >
                    نام محصول
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                  >
                    توضیحات
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                  >
                    قیمت
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {products?.map((product: any) => (
                  <tr key={product?.id}>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800'>
                      <Image
                        src={product?.image || ''}
                        alt='product-img'
                        width={50}
                        height={50}
                        className='rounded-md border object-cover shadow-md'
                      />
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-white'>
                      {product?.name}
                    </td>
                    <td className='truncate whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-white'>
                      {product?.description.substring(0, 70)}...
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-white'>
                      {product?.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
