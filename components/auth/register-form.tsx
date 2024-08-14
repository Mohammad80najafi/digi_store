'use client';
import { CreateDashboardUserAction } from '@/actions/user-auth';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/auth/submit-button';
const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div>
            <h1 className='text-md mb-4 text-center font-bold text-black dark:text-white md:text-xl'>
              ثبت نام کاربر جدید
            </h1>
          </div>
          <form
            action={async (formdata) => {
              const res = await CreateDashboardUserAction(formdata);
              if (res?.sucess) {
                alert(res?.message);
                formRef.current?.reset();
              } else {
                alert(res?.message);
                formRef.current?.reset();
              }
            }}
            className='space-y-6'
            ref={formRef}
          >
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-semibold leading-6 text-gray-900 dark:text-white'
              >
                نام کاربری را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
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
                className='block text-sm font-medium leading-6 text-gray-900 dark:text-white'
              >
                ایمیل را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='userRole'
                className='block text-sm font-medium leading-6 text-gray-900 dark:text-white'
              >
                نقش کاربر را انتخاب کنید
              </label>
              <div className='mt-2 flex items-center justify-between gap-4'>
                <div className='flex items-center justify-between gap-2'>
                  <label
                    htmlFor='userRoleUser'
                    className='text-sm font-medium leading-6 text-gray-900 dark:text-white'
                  >
                    کاربر
                  </label>
                  <input id='userRoleUser' name='userRoleUser' type='radio' />
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <label
                    htmlFor='userRoleAdmin'
                    className='text-sm font-medium leading-6 text-gray-900 dark:text-white'
                  >
                    ادمین
                  </label>
                  <input id='userRoleAdmin' name='userRoleAdmin' type='radio' />
                </div>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900 dark:text-white'
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
            <SubmitButton text='ثبت نام' width='w-full' />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
