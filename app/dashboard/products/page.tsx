import AllProducts from '@/components/dashboard/products/all-products';
import Link from 'next/link';

const Products = () => {
  return (
    <div>
      <div className='my-4'>
        <Link
          href='/dashboard/products/add'
          className='my-6 mr-4 rounded border-2 border-white bg-primary px-4 py-2 text-white dark:bg-gray-900 dark:text-white'
        >
          افزودن محصول
        </Link>
      </div>
      <AllProducts />
    </div>
  );
};

export default Products;
