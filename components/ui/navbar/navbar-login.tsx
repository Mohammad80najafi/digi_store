'use client';
import Link from 'next/link';
import Image from 'next/image';
import { UserLogOutAction } from '@/actions/user-auth';

const NavbarLogin = ({ session, textColor }: any) => {
  return (
    <div className=''>
      {session?.user?.name ? (
        <div className='flex items-center gap-3'>
          <Image
            src={session?.user?.image || ''}
            alt='user-image'
            width={30}
            height={30}
            className='cursor-pointer rounded-full'
            onClick={() => {
              UserLogOutAction();
            }}
          />
          <span className='font-semibold dark:text-white'>
            {session?.user?.name}
          </span>
        </div>
      ) : (
        <Link
          href='/login'
          className='rounded-md bg-primary px-4 py-2 text-sm text-black dark:text-white'
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default NavbarLogin;
