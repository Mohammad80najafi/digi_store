import { FaShoppingCart } from 'react-icons/fa';
import DarkMode from './DarkMode';
import { auth } from '@/auth';
import NavbarLogin from './navbar-login';
import Link from 'next/link';
import Menu from './menu';
import NavbarMobile from './navbar-mobile';

const Navbar = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className='relative z-50 bg-white shadow-lg duration-200 dark:bg-gray-900 dark:text-white'>
      <div className='py-4'>
        <div className='container flex items-center justify-between'>
          <div className='lg:hidden'>
            <NavbarMobile session={session} />
          </div>

          {/* logo and links sectin */}
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className={`sm:text-md text-2xl font-semibold uppercase tracking-widest text-primary md:text-2xl`}
            >
              دی جی / Digi
            </Link>
            {/* menu items */}
            <div className='hidden lg:block'>
              <Menu session={session} />
            </div>
          </div>

          {/* navbar right section */}

          <div className='hidden items-center justify-between gap-4 lg:flex'>
            {/* login section */}
            <div className='hidden lg:block'>
              <NavbarLogin session={session} />
            </div>
            <button className='relative p-3'>
              <FaShoppingCart className='text-xl text-gray-600 dark:text-gray-300' />
              <div className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                4
              </div>
            </button>
            {/* dark mode section */}
            <div className='hidden lg:block'>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
