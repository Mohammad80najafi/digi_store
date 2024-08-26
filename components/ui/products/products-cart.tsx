'use client';

import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { addProduct } from '@/redux/product/productSlice';
import { SlBasket } from 'react-icons/sl';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductsCart = ({ product }: any) => {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  return (
    <div className='cursor-pointer rounded-lg p-6 shadow-lg dark:bg-gray-800'>
      <div className='h-[180px] w-full border-b'>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={280}
          className='h-full w-full rounded object-cover'
        />
      </div>
      <div className=''>
        <div className='mt-6 flex items-center justify-center'>
          <h1 className='text-base font-bold text-blue-950 dark:text-white'>
            {product.name}
          </h1>
        </div>
        <div className='mt-3 flex items-center justify-center'>
          <span className='text-xl font-bold text-gray-800 dark:text-gray-200'>
            {product.price} تومان
          </span>
        </div>
      </div>
      <div
        className='mt-5 flex w-full items-center justify-center gap-4 rounded bg-gray-100 px-4 py-2 dark:bg-gray-700'
        onClick={() => {
          dispatch(addProduct(product));
          // toast.success('به سبد خرید اضافه شد');
        }}
      >
        <SlBasket className='text-2xl text-gray-600 dark:text-gray-400' />
        <span className='text-2xl font-bold text-gray-600 dark:text-gray-400'>
          خرید
        </span>
      </div>
    </div>
  );
};

export default ProductsCart;
