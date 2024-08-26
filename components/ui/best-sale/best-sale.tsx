import Products from '@/components/ui/products/Products';

const BestSale = () => {
  return (
    <div>
      <h1 className='text-center text-4xl font-bold text-gray-800 dark:text-white'>
        بهترین فروش ها
      </h1>
      <Products />
    </div>
  );
};

export default BestSale;
