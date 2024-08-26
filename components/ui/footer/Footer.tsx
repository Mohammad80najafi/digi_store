import Link from 'next/link';
import {
  FaLocationArrow,
  FaMobileAlt,
  FaInstagram,
  FaTelegram,
  FaLinkedin,
} from 'react-icons/fa';

const FooterLinks = [
  {
    id: 1,
    title: 'خانه',
    link: '/',
  },
  {
    id: 2,
    title: 'فروشگاه',
    link: '/store',
  },
  {
    id: 3,
    title: 'درباره سایت ',
    link: '/about',
  },
];

const Footer = () => {
  return (
    <div className='dark:bg-gray-950'>
      <div className='container'>
        <div className='pb-15 grid pt-5 md:grid-cols-3'>
          {/* company info */}
          <div className='px-4 py-8'>
            <Link
              href='/'
              className='tracking-widset text-2x font-semibold uppercase text-primary sm:text-3xl'
            >
              Digi/ دی جی
            </Link>
            <p className='pt-3 text-gray-600 dark:text-white/70 lg:pl-24'>
              لورم10 پیشرفت و توسعه دهندگان اینترنتی برای سازمان مالی و ارزهای
              آنلاین است.
            </p>
            <p className='mt-4 text-gray-600'>ساخته شده با ❤برای رزومه</p>
            <Link
              href='https://github.com/Mohammad80najafi/digi_store'
              className='mt-4 inline-block rounded-full bg-primary/90 px-4 py-2 text-sm text-white'
            >
              کد ها در گیتهاب
            </Link>
          </div>
          {/* Footer Links  */}
          <div className='col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10'>
            <div className='px-4 py-8'>
              <h1 className='mb-3 text-xl font-semibold dark:text-gray-400 sm:text-right'>
                آدرس های مهم
              </h1>
              <ul className='space-y-3'>
                {FooterLinks.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className='d uration-300 text-gray-600 hover:text-black dark:text-gray-400 hover:dark:text-white'
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* second col links */}
            <div className='px-4 py-8'>
              <h1 className='mb-3 text-xl font-semibold dark:text-gray-400 sm:text-right'>
                دسترسی سریع
              </h1>
              <ul className='space-y-3'>
                {FooterLinks.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className='d uration-300 text-gray-600 hover:text-black dark:text-gray-400 hover:dark:text-white'
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Fourth col */}
            <div className='col-span-2 px-4 py-8 sm:col-auto'>
              <h1 className='mb-3 text-xl font-semibold dark:text-gray-400 sm:text-right'>
                آدرس ها
              </h1>
              <div>
                <div className='flex items-center gap-3'>
                  <FaLocationArrow />
                  <p>ایران-تهران</p>
                </div>
                <div className='mt-6 flex items-center gap-3'>
                  <FaMobileAlt />
                  <p>98-9383091833</p>
                </div>
                {/* social links */}
                <div className='mt-6 flex items-center gap-3'>
                  <Link href='/'>
                    <FaInstagram className='text-3xl duration-200 hover:text-primary' />
                  </Link>
                  <Link href='/'>
                    <FaTelegram className='text-3xl duration-200 hover:text-primary' />
                  </Link>
                  <Link href='/'>
                    <FaLinkedin className='text-3xl duration-200 hover:text-primary' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
