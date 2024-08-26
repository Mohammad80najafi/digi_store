import Image from 'next/image';

const Category2 = () => {
  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-4'>
          {/* firstCol */}
          <div className='relative col-span-2 flex h-[320px] w-full items-end rounded-3xl bg-gradient-to-br from-black/90 to-black/70 px-3 py-10 pl-5 text-white'>
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
            <span className='hidden text-xl font-semibold text-white lg:inline'>
              بروزترین هدفون ها با تکنولوژی های روز
            </span>
            <Image
              dir='ltr'
              src='/category/earphone.png'
              alt='earphone'
              width={300}
              height={280}
              className='absolute right-40 top-0 w-[250px] md:right-80'
            />
          </div>
          {/* secoundCol */}

          {/* thirdCol */}
          <div className='relative col-span-2 flex h-[320px] w-full items-end rounded-3xl bg-gradient-to-br from-primary to-primary/90 px-3 py-10 pl-5 text-white'>
            <div>
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
            <span className='hidden text-xl font-semibold text-white lg:inline'>
              بروزترین لپ تاپ ها با تکنولوژی های روز
            </span>
            <Image
              src='/category/macbook.png'
              alt='earphone'
              width={300}
              height={280}
              className='absolute right-40 top-0 w-[250px] md:right-80'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category2;
