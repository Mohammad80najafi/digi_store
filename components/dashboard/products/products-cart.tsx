'use client';

import Link from 'next/link';
import Image from 'next/image';

const ProductsCart = () => {
  return (
    <div className='rounded-md border-2 border-gray-300 p-4'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div>
          <Image
            src='/product/p-1.jpg'
            alt='product'
            width={200}
            height={200}
            className='rounded-md'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <span className='text-md font-bold text-gray-800'>
                نام محصول :
              </span>
              <span>پروتکل سیستم عامل اپلیکیشن</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-md font-bold text-gray-800'>قیمت :</span>
              <span> 100.0000</span>
            </div>
          </div>
          <div className='flex gap-2'>
            <span className='text-md font-bold text-gray-800'>
              تعداد باقی مانده :{' '}
            </span>
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCart;
