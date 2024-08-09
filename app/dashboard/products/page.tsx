import AllProducts from '@/components/dashboard/products/all-products';

const Products = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='fomt-bold mt-2 text-center text-2xl'>همه محصولات</h1>
      <div>
        <AllProducts />
      </div>
    </div>
  );
};

export default Products;
