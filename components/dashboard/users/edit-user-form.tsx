'use client';
import SubmitButton from '@/components/auth/submit-button';
import { EditUserAction } from '@/actions/user-auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditUserForm = ({ user }: any) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRoleUser, setUserRoleUser] = useState('');
  const [userRoleAdmin, setUserRoleAdmin] = useState('');

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPassword(user?.password);
    setUserRoleUser(user?.role);
    setUserRoleAdmin(user?.role);
  }, []);

  return (
    <div>
      <div className='flex min-h-full w-full flex-col justify-center px-6 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div>
            <h1 className='text-md mb-4 text-center font-bold text-white dark:text-white md:text-xl'>
              ویرایش کاربر
            </h1>
          </div>
          <form
            className='w-full space-y-6'
            action={async (data) => {
              const res = await EditUserAction(data, user?.id);
              if (res?.sucess) {
                alert(res?.message);
                router.push('/dashboard/users');
              }
            }}
          >
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-semibold leading-6 text-white dark:text-white'
              >
                نام کاربری را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                className='block text-sm font-medium leading-6 text-white dark:text-white'
              >
                ایمیل را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='userRole'
                className='block text-sm font-medium leading-6 text-white dark:text-white'
              >
                نقش کاربر را انتخاب کنید
              </label>
              <div className='mt-2 flex items-center justify-between gap-4'>
                <div className='flex items-center justify-between gap-2'>
                  <label
                    htmlFor='userRoleUser'
                    className='text-sm font-medium leading-6 text-white dark:text-white'
                  >
                    کاربر
                  </label>
                  <input
                    id='userRoleUser'
                    name='userRoleUser'
                    type='radio'
                    checked={userRoleUser === 'USER'}
                  />
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <label
                    htmlFor='userRoleAdmin'
                    className='text-sm font-medium leading-6 text-white dark:text-white'
                  >
                    ادمین
                  </label>
                  <input
                    id='userRoleAdmin'
                    name='userRoleAdmin'
                    type='radio'
                    checked={userRoleAdmin === 'ADMIN'}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-white dark:text-white'
                >
                  رمز عبور را وارد کنید
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  autoComplete='current-password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <SubmitButton text='ویرایش کاربر' width='w-full' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
