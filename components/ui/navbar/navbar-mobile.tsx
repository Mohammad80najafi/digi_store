'use client';

import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';

import NavbarLoign from './navbar-login';
import DarkMode from './DarkMode';
import { BiX } from 'react-icons/bi';
import Menu from './menu';
import Link from 'next/link';
import ShoppingCartBasket from './shopping-cart-basket';

const NavbarMobile = ({ session }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <IoMenu
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer text-2xl dark:text-white lg:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
        <Link href='/' className='text-primary text-2xl font-semibold uppercase tracking-widest'>
          Digi
        </Link>
        <ShoppingCartBasket />
      </div>
      {isOpen && (
        <div className='fixed left-0 top-40 z-50 w-[320px] rounded-md bg-white p-0 transition-all duration-300 dark:bg-[#1b1b1b] md:w-[400px]'>
          <BiX
            onClick={() => setIsOpen(false)}
            className='absolute left-4 top-4 cursor-pointer text-2xl text-black dark:text-white'
          />
          <div className='mt-7 flex flex-col items-start justify-center gap-4 p-4'>
            <div className='flex w-full items-center justify-center gap-5 border-b-2 border-black p-4 transition-all duration-200 dark:border-white'>
              <NavbarLoign session={session} />
              <DarkMode />
            </div>
          </div>
          <div className='flex w-full items-center justify-center gap-5 p-4 transition-all duration-200'>
            <Menu vertical={true} session={session} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
