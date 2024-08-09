'use client';
import SubmitButton from '@/components/auth/submit-button';
import { EditUserAction } from '@/actions/user-auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type EditUserFormProps = {
  user:
    | {
        id: string;
        name: string | null;
        email: string | null;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
      }
    | null
    | undefined;
};

const EditUserForm = ({ user }: any) => {
  const router = useRouter();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    userRoleUser: '',
    userRoleAdmin: '',
    id: user?.id,
  });

  const handleSubmit = async () => {
    const res = await EditUserAction(data);
    console.log('data', data);
  };

  return (
    <div>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div>
            <h1 className='text-md mb-4 text-center font-bold text-black md:text-xl'>
              {user?.name} ویرایش کاربر
            </h1>
          </div>
          <form className='space-y-6' action={() => handleSubmit()}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                نام کاربری را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  type='name'
                  required
                  autoComplete='name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                ایمیل را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='userRole'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                نقش کاربر را انتخاب کنید
              </label>
              <div className='mt-2 flex items-center justify-between gap-4'>
                <div className='flex items-center justify-between gap-2'>
                  <label
                    htmlFor='userRoleUser'
                    className='text-sm font-medium leading-6 text-gray-900'
                  >
                    کاربر
                  </label>
                  <input
                    id='userRoleUser'
                    name='userRoleUser'
                    type='radio'
                    onChange={(e) =>
                      setData({ ...data, userRoleUser: e.target.value })
                    }
                  />
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <label
                    htmlFor='userRoleAdmin'
                    className='text-sm font-medium leading-6 text-gray-900'
                  >
                    ادمین
                  </label>
                  <input
                    id='userRoleAdmin'
                    onChange={(e) =>
                      setData({ ...data, userRoleAdmin: e.target.value })
                    }
                    name='userRoleAdmin'
                    type='radio'
                    checked={user?.role === 'ADMIN'}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  رمز عبور را وارد کنید
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                  autoComplete='current-password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <SubmitButton text='ثبت نام' width='w-full' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
