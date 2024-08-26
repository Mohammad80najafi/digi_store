import Image from 'next/image';

const Category = () => {
  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {/* firstCol */}
          <div className='relative flex h-[320px] w-full items-end rounded-3xl bg-gradient-to-br from-black/90 to-black/70 py-10 pl-5 text-white'>
            <div className=''>
              <div className='mb-4'>
                <p className='mb-[2px] text-2xl font-bold text-gray-400'>لذت</p>
                <p className='mb-[2px] text-2xl font-semibold'>با</p>
                <p className='mb-[2px] text-4xl font-bold opacity-20 xl:text-5xl'>
                  هدفون
                </p>
                <button className='rounded bg-primary px-4 py-2 font-bold'>
                  بیشتر
                </button>
              </div>
            </div>
            <Image
              dir='ltr'
              src='/category/earphone.png'
              alt='earphone'
              width={300}
              height={280}
              className='absolute bottom-0 left-10 w-[320px]'
            />
          </div>
          {/* secoundCol */}
          <div className='relative flex h-[320px] w-full items-end rounded-3xl bg-gradient-to-br from-brandYellow to-brandYellow/90 py-10 pl-5 text-white'>
            <div className='ltr'>
              <div className='mb-4'>
                <p className='mb-[2px] text-2xl font-bold'>لذت</p>
                <p className='mb-[2px] text-2xl font-semibold'>با</p>
                <p className='mb-[2px] text-4xl font-bold opacity-40 xl:text-5xl'>
                  ساعت
                </p>
                <button className='rounded bg-white px-4 py-2 font-bold text-brandYellow'>
                  بیشتر
                </button>
              </div>
            </div>
            <Image
              src='/category/watch.png'
              alt='earphone'
              width={300}
              height={280}
              className='absolute -right-4 w-[320px] lg:top-[40px]'
            />
          </div>
          {/* thirdCol */}
          <div className='relative col-span-2 flex h-[320px] w-full items-end rounded-3xl bg-gradient-to-br from-primary to-primary/90 py-10 pl-5 text-white'>
            <div className='ltr'>
              <div className='spce-y-3 mb-4'>
                <p className='text-2xl font-bold'>لذت</p>
                <p className='mb-4 text-2xl font-semibold'>با</p>
                <p className='text-4xl font-bold opacity-40 xl:text-5xl'>
                  لپ تاپ
                </p>
                <button className='rounded bg-white px-4 py-2 font-bold text-primary'>
                  بیشتر
                </button>
              </div>
            </div>
            <Image
              src='/category/macbook.png'
              alt='earphone'
              width={300}
              height={280}
              className='absolute -right-0 top-1/2 w-[250px] -translate-y-1/2'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
