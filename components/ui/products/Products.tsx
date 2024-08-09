import ProductsCart from './products-cart';

const products = () => {
  return (
    <div>
      <h1 className='text-center text-xl font-bold text-primary underline underline-offset-8 md:text-4xl'>
        All Products
      </h1>
      <div className='mdLmt-16 mx-auto mt-8 grid w-4/5 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <div>
          <ProductsCart />
        </div>
      </div>
    </div>
  );
};

export default products;
