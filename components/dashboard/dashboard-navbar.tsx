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

  return (
    <div className='relative flex items-center gap-8 bg-white px-4 py-4 shadow-lg dark:bg-gray-900'>
      {isOpenlinks.map((data, index) => (
        <Link
          key={index}
          href={data.href}
          className={`z-200 w-full text-xl text-gray-900 dark:text-slate-400 md:text-3xl`}
        >
          <div className='flex items-center justify-center gap-2'>
            <span
              className={`${pathname === data.href ? 'text-primary dark:text-white' : ''}`}
            >
              {isOpenlinks[index].icon}
            </span>
            <h3
              className={`gep-4 flex items-end justify-center font-semibold ${pathname === data.href ? 'text-primary dark:text-white' : ''}`}
            >
              {isOpenlinks[index].name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardNavbar;
