'use client';
import { useAppSelector, useAppDispatch } from '@/redux/redux-hooks';
import { updateQuantity, deleteProducts } from '@/redux/product/productSlice';
import Image from 'next/image';
import toast from 'react-hot-toast';

const Products = () => {
  const productss = useAppSelector((state) => state?.product.products);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (id: number, quantity: string) => {
    const quantityNumber = parseInt(quantity);
    if (quantityNumber > 0) {
      dispatch(updateQuantity({ id, quantity: quantityNumber }));
    }
  };
  //اینو کذاشتم ک اگه تعداد محصول بیشتر از 5 بود اسکرول بیاد
  const overFlow = productss.length >= 5 ? true : false;
  if (productss.length === 0)
    return (
      <div className='inline-block min-w-full p-1.5 align-middle'>
        <h1 className='mt-5 rounded border border-gray-300 bg-white py-5 text-center text-xl font-bold text-primary shadow-md dark:border-none dark:bg-gray-800'>
          لطفا ابتدا یک محصول را به سبد خرید اضافه کنید
        </h1>
      </div>
    );
  return (
    <div className={`${overFlow ? 'overflow-y-scroll' : ''}`}>
      {productss.map((product) => (
        <div
          key={product.id}
          className={
            'flex items-center justify-start gap-4 rounded-md border-b bg-white p-4 dark:bg-gray-700'
          }
        >
          <Image
            src={product.image}
            alt='product'
            width={100}
            height={200}
            className='rounded-md'
          />
          <div className='flex flex-col items-start justify-start gap-4'>
            <span className='font-semibold text-gray-700 dark:text-white'>
              {product.name}
            </span>

            <span className='font-bold text-primary'>${product.price}</span>
            <input
              type='number'
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              placeholder='تعداد'
              className='w-[60px] rounded-md border-2 border-gray-800 bg-cyan-100/50 p-2 text-sm font-semibold text-gray-700 placeholder:text-gray-600 dark:border-gray-200 dark:bg-gray-400 dark:text-white dark:placeholder:text-white'
            />
            <span
              className='cursor-pointer font-bold text-white dark:text-primary'
              onClick={() => {
                dispatch(deleteProducts(product.id));
                toast.success('از سبد خرید حذف شد');
              }}
            >
              حذف
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
