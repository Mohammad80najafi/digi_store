'use client';

import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '@/redux/redux-hooks';
import Link from 'next/link';

const ShoppingCartBasket = () => {
  const products = useAppSelector((state) => state.product.products);
  return (
    <Link href='/order' className='relative p-3'>
      <FaShoppingCart className='text-xl text-gray-600 dark:text-gray-300' />
      <div className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white'>
        {products?.length}
      </div>
    </Link>
  );
};

export default ShoppingCartBasket;
