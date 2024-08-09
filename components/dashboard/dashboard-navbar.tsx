'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { FaUsers, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
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
    <div className='fixed left-0 top-0 z-50 md:h-screen'>
      {isOpen === true ? (
        <div className='duration-300 relative flex h-screen flex-col items-center bg-primary px-4 py-10 shadow-md transition-all ease-in-out dark:bg-gray-900 md:px-10'>
          <FaArrowLeft
            className='absolute right-4 top-4 text-2xl text-gray-800 dark:text-slate-400'
            onClick={() => setIsOpen(false)}
          />
          {isOpenlinks.map((data, index) => (
            <Link
              key={index}
              href={data.href}
              className={`z-200 mr-4 mt-5 w-full text-xl text-gray-800 dark:text-slate-400 md:text-3xl`}
            >
              <div className='flex items-center justify-center gap-4'>
                <span
                  className={`${pathname === data.href ? 'text-gray-950 dark:text-primary' : ''}`}
                >
                  {' '}
                  {isOpenlinks[index].icon}{' '}
                </span>
                <h3
                  className={`gep-4 flex items-end justify-center ${pathname === data.href ? 'text-gray-950 dark:text-primary' : ''}`}
                >
                  {isOpenlinks[index].name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='absolute left-0 top-0'>
          <div className='relative flex h-screen w-[40px] flex-col items-center bg-primary px-1 py-4 shadow-md transition-all duration-500 ease-in-out dark:bg-gray-900 md:px-10'>
            <FaArrowRight
              onClick={() => setIsOpen(true)}
              className='text-md absolute top-2 text-gray-800 dark:text-slate-400 md:right-4'
            />
            {isCloselinks.map((data, index) => (
              <Link
                key={index}
                href={data.href}
                className={`relative mt-5 flex flex-col items-end justify-center text-xl text-gray-800 transition-all duration-500 ease-in-out dark:text-slate-400 md:text-3xl`}
              >
                <h3
                  className={`transition-all ease-in ${pathname === isCloselinks[index].href ? 'text-gray-950 dark:text-primary' : ''}`}
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
