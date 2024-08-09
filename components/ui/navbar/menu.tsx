'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type MenuProps = {
  vertical?: boolean;
  session: any;
};

const Menu = ({ vertical = false, session }: MenuProps) => {
  const MenuLinks = [
    {
      id: 1,
      name: 'Home',
      href: '/',
    },
    {
      id: 2,
      name: 'Store',
      href: '/store',
    },
  ];

  return (
    <div>
      <ul className={`flex items-center gap-2 ${vertical ? 'flex-col' : ''}`}>
        {MenuLinks.map((data, index) => (
          <li key={index}>
            <Link
              href={data.href}
              className={`inline-block px-4 font-semibold text-gray-500 duration-200 hover:text-black dark:hover:text-white ${
                usePathname() === data.href ? 'text-primary' : ''
              }`}
            >
              {data.name}
            </Link>
          </li>
        ))}
        {session?.user?.userRole === 'ADMIN' ? (
          <li>
            <Link
              href='/dashboard'
              className={`inline-block px-4 font-semibold text-gray-500 duration-200 hover:text-black dark:hover:text-white ${
                usePathname() === '/dashboard' ? 'text-primary' : ''
              }`}
            >
              Dashboard
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Menu;
