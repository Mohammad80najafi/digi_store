import ProductsCart from './products-cart';
import { GetTenProductsAction } from '@/actions/product-actions';

const products = async () => {
  const products = await GetTenProductsAction();
  return (
    <div className='container'>
      <h1 className='text-center text-xl font-semibold text-gray-600 dark:text-white md:text-4xl'>
        جدیدترین محصولات
      </h1>
      <div className='mt-5 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product: any) => (
          <ProductsCart product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default products;
