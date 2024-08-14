import { prismadb } from '@/prismadb';
import ProductsList from './products-list';

const AllProducts = async () => {
  const products = await prismadb.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className='flex items-center justify-center'>
      <ProductsList products={products} />
    </div>
  );
};

export default AllProducts;
