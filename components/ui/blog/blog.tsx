import Image from 'next/image';
const Blog = () => {
  return (
    <div className='py-12'>
      <div className='container'>
        <h1 className='text-center text-4xl font-bold text-gray-800 dark:text-white'>
          آخرین ها
        </h1>
        <p className='my-4 text-center text-xl font-semibold text-gray-700 dark:text-white'>
          آخرین اخبار را بدانید
        </p>
        {/* blog section */}
        <div className='grid grid-cols-1 gap-6 gap-y-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-7'>
          {/* blog1 */}
          <div className='bg-white dark:bg-gray-900'>
            <div className='mb-2 overflow-hidden rounded-2xl'>
              <Image
                src='/blogs/blog-1.jpg'
                width={400}
                height={400}
                alt='blog1'
                className='h-[220px] w-full rounded-2xl object-cover duration-500 hover:scale-105'
              />
            </div>
            <div className='space-y-2'>
              <p className='text-xs text-gray-500'>1403/3/2</p>
              <p className='line-clamp-1 font-bold dark:text-gray-400'>
                مدیر جی بی ال
              </p>
              <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>
                طبق جدیدترین آخرین مدیر شرکت jbl به گیاهخوار است
              </p>
            </div>
          </div>
          {/* blog2 */}
          <div className='bg-white dark:bg-gray-900'>
            <div className='mb-2 overflow-hidden rounded-2xl'>
              <Image
                src='/blogs/blog-2.jpg'
                width={400}
                height={400}
                alt='blog1'
                className='h-[220px] w-full rounded-2xl object-cover duration-500 hover:scale-105'
              />
            </div>
            <div className='space-y-2'>
              <p className='text-xs text-gray-500'>1403/3/2</p>
              <p className='line-clamp-1 font-bold dark:text-gray-400'>
                مدیر جی بی ال
              </p>
              <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>
                طبق جدیدترین آخرین مدیر شرکت jbl به گیاهخوار است
              </p>
            </div>
          </div>
          {/* blog3 */}
          <div className='bg-white dark:bg-gray-900'>
            <div className='mb-2 overflow-hidden rounded-2xl'>
              <Image
                src='/blogs/blog-3.jpg'
                width={400}
                height={400}
                alt='blog1'
                className='h-[220px] w-full rounded-2xl object-cover duration-500 hover:scale-105'
              />
            </div>
            <div className='space-y-2'>
              <p className='text-xs text-gray-500'>1403/3/2</p>
              <p className='line-clamp-1 font-bold dark:text-gray-400'>
                مدیر جی بی ال
              </p>
              <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>
                طبق جدیدترین آخرین مدیر شرکت jbl به گیاهخوار است
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
