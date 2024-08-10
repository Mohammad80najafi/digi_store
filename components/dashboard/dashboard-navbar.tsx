'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { FaUsers, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { AiFillProduct } from 'react-icons/ai';
import { TbReorder } from 'react-icons/tb';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isOpenlinks = [
    {
      id: 1,
      name: 'مدیریت',
      icon: <MdSpaceDashboard />,
      href: '/dashboard',
    },
    {
      id: 2,
      name: 'کاربران',
      icon: <FaUsers />,
      href: '/dashboard/users',
    },
    {
      id: 3,
      name: 'محصولات',
      icon: <AiFillProduct />,
      href: '/dashboard/products',
    },
    {
      id: 4,
      name: 'سفارشات',
      icon: <TbReorder />,
      href: '/dashboard/orders',
    },
    {
      id: 5,
      name: 'تنظیمات',
      icon: <IoSettingsSharp />,
      href: '/dashboard/settings',
    },
  ];
  const isCloselinks = [
    {
      id: 1,
      icon: <MdSpaceDashboard />,
      href: '/dashboard',
    },
    {
      id: 2,
      icon: <FaUsers />,
      href: '/dashboard/users',
    },
    {
      id: 3,
      icon: <AiFillProduct />,
      href: '/dashboard/products',
    },
    {
      id: 4,
      icon: <TbReorder />,
      href: '/dashboard/orders',
    },
    {
      id: 5,
      icon: <IoSettingsSharp />,
      href: '/dashboard/settings',
    },
  ];

  return (
    <div className='fixed bottom-0 left-0 right-0 z-10 w-screen'>
      {isOpen === true ? (
        <div className='relative hidden w-full items-center bg-primary/80 px-4 py-10 shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-900 md:flex md:px-10'>
          <FaArrowDown
            className='absolute right-4 top-4 cursor-pointer text-2xl text-white dark:text-slate-400'
            onClick={() => setIsOpen(false)}
          />
          {isOpenlinks.map((data, index) => (
            <Link
              key={index}
              href={data.href}
              className={`z-200 mr-4 mt-5 w-full text-xl text-white dark:text-slate-400 md:text-3xl`}
            >
              <div className='flex items-center justify-center gap-4'>
                <span
                  className={`${pathname === data.href ? 'text-gray-900 dark:text-white' : ''}`}
                >
                  {' '}
                  {isOpenlinks[index].icon}{' '}
                </span>
                <h3
                  className={`gep-4 flex items-end justify-center ${pathname === data.href ? 'text-gray-900 dark:text-white' : ''}`}
                >
                  {isOpenlinks[index].name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='mb-3 w-screen'>
          <div className='relative mx-auto flex w-[70%] items-center rounded-l-full rounded-r-full bg-primary/90 px-1 py-4 shadow-lg transition-all duration-500 ease-in-out dark:bg-gray-900 md:px-10'>
            <FaArrowUp
              onClick={() => setIsOpen(true)}
              className='text-md absolute top-3 hidden cursor-pointer text-white dark:text-slate-400 md:right-8 md:inline-block'
            />
            {isCloselinks.map((data, index) => (
              <Link
                key={index}
                href={data.href}
                className={`relative flex w-full items-center justify-center text-xl text-white transition-all duration-500 ease-in-out dark:text-slate-400 md:mt-0 md:text-3xl`}
              >
                <h3
                  className={`transition-all ease-in ${pathname === isCloselinks[index].href ? 'text-gray-900 dark:text-white' : ''}`}
                >
                  {isCloselinks[index].icon}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
