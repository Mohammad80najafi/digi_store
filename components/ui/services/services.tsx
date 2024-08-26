import {
  FaCarSide,
  FaHeadphonesAlt,
  FaWallet,
  FaCheckCircle,
} from 'react-icons/fa';

const ServicesData = [
  {
    id: 1,
    icon: <FaCarSide className='text-4xl text-primary md:text-5xl' />,
    title: 'تحویل رایگان',
    description: 'تحویل رایگان برای همه سفارشات',
  },
  {
    id: 2,
    icon: <FaCheckCircle className='text-4xl text-primary md:text-5xl' />,
    title: 'ضمانت وجه',
    description: '30 روز زمانت بازگشت وجه',
  },
  {
    id: 3,
    icon: <FaWallet className='text-4xl text-primary md:text-5xl' />,
    title: 'پرداخت امن',
    description: 'پرداخت امن برای همه سفارشات',
  },
  {
    id: 4,
    icon: <FaHeadphonesAlt className='text-4xl text-primary md:text-5xl' />,
    title: 'پشتیبانی 24/7',
    description: 'پشتیبانی همه روزه در 24 ساعت شبانه روز',
  },
];

const Services = () => {
  return (
    <div>
      <div className='container my-14 md:my-20'>
        <div className='grid grid-cols-2 gap-8 gap-y-8 lg:grid-cols-4'>
          {ServicesData.map((item) => (
            <div
              className='flex flex-col items-start gap-4 sm:flex-row'
              key={item.id}
            >
              {item.icon}
              <div className=''>
                <h1 className='font-bold dark:text-gray-400 lg:text-xl'>
                  {item.title}
                </h1>
                <h1 className='text-sm text-gray-400 dark:text-gray-400'>
                  {item.description}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
