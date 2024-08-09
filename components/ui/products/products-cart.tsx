'use client';

import Image from 'next/image';
import { BsHeart } from 'react-icons/bs';

const data  = {
  id: 1,
  name: '',
  image: '',
  eth: 12,
  currentBid:12,
  love: 12
};



const ProductsCart = () => {
  return (
    <div className='cursor-pointer rounded-lg border-2 border-gray-300 border-opacity-30 p-6'>
      <div className='h-[180px] w-full'>
        <Image
          src={data.image}
          alt={data.name}
          width={300}
          height={280}
          className='h-full w-full object-cover'
        />
      </div>
      <div className=''>
        <div className='mt-6 flex items-center justify-between'>
          <h1 className='text-base font-bold text-blue-950 transition-all duration-200 hover:text-blue-700'>
            {data.name}
          </h1>
          <span className='rounded-md border-[1px] border-gray-500 px-2 py-1 text-xs font-bold text-green-700'>
            {data.eth} ETH
          </span>
        </div>
        <p className='mb-2 mt-2 text-gray-700'>
          Current Bids{' '}
          <span className='text-yellow-500'>{data.currentBid}</span> ETH
        </p>
        <div className='mt-4 flex items-center justify-between'>
          <h1 className='text-sm font-bold text-indigo-950'>Place Bid</h1>
          <div className='flex items-center space-x-2 text-gray-600'>
            <BsHeart />
            <span className='text-sm'>{data.love}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCart;
