'use client';

import Image from 'next/image';
import { DeleteProductAction } from '@/actions/product-actions';
import EditProductForm from './edit-product-form';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    zIndex: '110',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#111827',
    borderRadius: '10px',
  },
};

const ProductsList = ({ products }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  return (
    <>
      <div className='flex'>
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
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                    >
                      فرمان ها
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {products?.map((product: any) => (
                    <tr>
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
                      <td className='flex items-center justify-center gap-4 whitespace-nowrap px-6 py-4 text-end text-sm font-medium'>
                        <button
                          type='button'
                          className='inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-red-600 hover:text-red-800 focus:text-red-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                          onClick={() => {
                            DeleteProductAction(product?.id);
                          }}
                        >
                          حذف
                        </button>
                        <button
                          onClick={() => {
                            setModalIsOpen(true);
                            setProduct(product);
                          }}
                          type='button'
                          className='inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                        >
                          ویرایش
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel='ویرایش کاربر'
      >
        <div className='z-50 flex flex-col px-8 dark:bg-gray-900 dark:text-white'>
          <IoClose
            onClick={() => setModalIsOpen(false)}
            className='right-3 top-3 h-7 w-7 text-white dark:text-white'
          />
          <EditProductForm product={product} />
        </div>
      </Modal>
    </>
  );
};

export default ProductsList;
