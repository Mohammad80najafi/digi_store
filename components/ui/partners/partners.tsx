import Image from 'next/image';

const Partners = () => {
  return (
    <div className='mt-24 hidden bg-gray-200 py-12 dark:bg-white/10 md:block'>
      <div className='container'>
        <div className='grid grid-cols-5 place-items-center gap-3 opacity-50'>
          <Image
            src='/brand/br-1.png'
            width={400}
            height={400}
            alt='brand1'
            className='w-[80px] dark:invert'
          />
          <Image
            src='/brand/br-2.png'
            width={400}
            height={400}
            alt='brand2'
            className='w-[80px] dark:invert'
          />
          <Image
            src='/brand/br-3.png'
            width={400}
            height={400}
            alt='brand3'
            className='w-[80px] dark:invert'
          />
          <Image
            src='/brand/br-4.png'
            width={400}
            height={400}
            alt='brand4'
            className='w-[80px] dark:invert'
          />
          <Image
            src='/brand/br-5.png'
            width={400}
            height={400}
            alt='brand5'
            className='w-[80px] dark:invert'
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
