'use client';

import { useAppSelector } from '@/redux/redux-hooks';

import Image from 'next/image';

const LastOrders = () => {
  const products = useAppSelector((state) => state?.product.products);
  return (
    <div>
      {products.length > 0 ? (
        <div className='flex items-center justify-center'>
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
                        تصویر
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
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-white'>
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
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-white'>
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
      ) : (
        <h1 className='text-2xl font-semibold text-white dark:text-white'>
          هیچ محصولی در انتظار خرید نیست !!
        </h1>
      )}
    </div>
  );
};

export default LastOrders;
