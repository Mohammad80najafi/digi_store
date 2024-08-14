'use client';

import { MdDeleteForever } from 'react-icons/md';

import { deleteProductAction } from '@/actions/product-actions';

const DeletePostButton = ({ id }: { id: any }) => {
  return (
    <button
      onClick={() => deleteProductAction(id)}
      className='rounded-md bg-red-500 p-4 text-white shadow-md hover:bg-red-600'
    >
      <MdDeleteForever className='size-5' />
    </button>
  );
};

export default DeletePostButton;
