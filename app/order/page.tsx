import OrderForm from '@/components/ui/order/order-form';
import Products from '@/components/ui/order/products';

const Payment = () => {
  return (
    <div className='h-screen w-full overflow-y-hidden dark:bg-gray-800'>
      <div className='container flex flex-col gap-5'>
        <h1 className='mt-10 text-2xl font-bold text-primary underline underline-offset-8'>
          ثبت سفارش
        </h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='w-full'>
            <Products />
          </div>
          <div className='w-full'>
            <OrderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
