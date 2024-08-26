import DarkMode from './DarkMode';
import { auth } from '@/auth';
import NavbarLogin from './navbar-login';
import Link from 'next/link';
import Menu from './menu';
import NavbarMobile from './navbar-mobile';
import ShoppingCartBasket from './shopping-cart-basket';

const Navbar = async () => {
  const session = await auth();
  return (
    <div className='ipad:w-[90%] ipad:px-8 ipad:py-3 fixed left-0 right-0 top-5 z-50 mx-auto w-[80%] items-center rounded-3xl bg-white/50 px-5 py-2 backdrop-blur-[6px] dark:bg-black/50 md:flex'>
      <div className='flex w-full items-center justify-between'>
        <div className='w-full lg:hidden'>
          <NavbarMobile session={session} />
        </div>

        {/* logo and links sectin */}
        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className={`hidden text-2xl font-semibold uppercase tracking-widest text-primary sm:text-[10px] md:inline md:text-2xl`}
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
          <ShoppingCartBasket />
          {/* dark mode section */}
          <div className='hidden lg:block'>
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
