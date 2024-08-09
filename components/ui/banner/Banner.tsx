import Image from 'next/image';

import headphone from '@/public/hero/headphone.png';

const Banner = () => {
  const data = {
    discount: '20% تخفیف',
    title: 'بهترین هدفون',
    date: '20 روز پیش',
    image: headphone,
    title2: 'Air Solo Bass',
    title3: 'فروش زمستانه',
    title4: 'بهترین برند هدفون با صدای عالی و گوش نواز',
  };

  return (
    <div className='flex min-h-[500px] items-center justify-center py-5'>
      <div className='container'>
        <div className='grid grid-cols-1 items-center gap-6 rounded-3xl bg-[#f42c37] text-white dark:bg-[#1d1d1d] md:grid-cols-3'>
          {/* first col */}
          <div className='p-6 sm:p-8'>
            <p className='text-sm'>{data.discount}</p>
            <h1 className='text-4xl font-bold uppercase lg:text-7xl'>
              {data.title}
            </h1>
            <p>{data.date}</p>
          </div>
          {/* second col */}
          <div className='flex h-full items-center'>
            <Image
              src={data.image}
              alt='image'
              className='mx-auto w-[250px] scale-125 object-cover drop-shadow-2xl md:w-[340px]'
            />
          </div>
          {/* third col */}
          <div className='flex flex-col justify-center gap-4 p-7 sm:p-8'>
            <p className='text-xl font-bold'>{data.title2}</p>

            <p className='text-3xl font-bold sm:text-5xl'>{data.title3}</p>
            <p className='text-sm leading-5 tracking-wide'>{data.title4}</p>
            <div>
              <button className='rounded-full bg-white px-4 py-2 text-[#f42c37] dark:text-black'>
                مشاهده
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
