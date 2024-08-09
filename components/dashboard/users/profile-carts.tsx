'use client';
import Image from 'next/image';
import Link from 'next/link';

import { DeleteUserAction } from '@/actions/user-auth';

import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ProfileCartsProps = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    password: string | null;
    emailVerified: Date | null;
    image: string | null;
    role: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

const ProfileCarts = ({ user }: ProfileCartsProps) => {
  const [isEdit, setIsEdit] = useState('');
  const router = useRouter();
  return (
    <div>
      <div
        className='duration-400 mt-3 flex h-40 w-96 cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-lg border-2 border-gray-300 px-4 py-2 shadow-sm transition-transform hover:scale-105'
        key={user?.id}
      >
        <div className='item-center flex gap-2'>
          <div>
            {user?.image ? (
              <Image
                src={user?.image}
                alt='user icon'
                width={100}
                height={100}
                className='rounded-full'
              />
            ) : (
              <Image
                src={'/icons/User-icon-vector-02.svg'}
                alt='user icon'
                width={100}
                height={100}
                className='rounded-full'
              />
            )}
          </div>
        </div>
        <div className='flex flex-col items-start justify-start gap-2'>
          <div>
            <span className='text-xl font-bold text-gray-800'>
              نام کاربری :{' '}
            </span>
            <span className='truncate font-semibold text-gray-700'>
              {user?.name}
            </span>
          </div>
          <div>
            <span className='text-xl font-bold text-gray-800'> ایمیل : </span>
            <span className='truncate font-semibold text-gray-700'>
              {user?.email}
            </span>
          </div>
          <div>
            <span className='text-xl font-bold text-gray-800'>
              نقش کاربر :{' '}
            </span>
            <span className='font-semibold text-gray-700'>{user?.role}</span>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-2 px-2'>
          <button>
            <MdOutlineDeleteOutline
              className='cursor-pointer rounded-lg bg-red-700 p-2 text-4xl text-white'
              onClick={() => DeleteUserAction(user?.id)}
            />
          </button>
          <Link href={`/dashboard/users/${user?.id}`}>
            <FaUserEdit className='cursor-pointer rounded-lg bg-blue-700 p-2 text-4xl text-white' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCarts;
