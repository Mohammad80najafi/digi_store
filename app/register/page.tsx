'use client';
import {
  CreateUserAction,
  UserLoginCredentialsAction,
} from '@/actions/user-auth';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/auth/submit-button';
import LoginGithubButton from '@/components/auth/login-github-button';
import Link from 'next/link';

const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center border px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h1 className='text-center text-2xl font-bold text-primary'>
            دیجی شاپ
          </h1>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            ساخت حساب کاربری جدید
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            action={async (formdata) => {
              const res = await CreateUserAction(formdata);
              if (res?.sucess) {
                await UserLoginCredentialsAction(formdata);
                router.push('/');
              } else {
                alert(res?.message);
                formRef.current?.reset();
              }
            }}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                نام کاربری خود را وارد کنید
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
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                ایمیل خود را وارد کنید
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
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  رمز عبور خود را وارد کنید
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

            <div className='flex items-center justify-between'>
              <SubmitButton text='ثبت نام' width='w-1/2' />
              <LoginGithubButton />
            </div>
            <Link
              href='/login'
              className='mt-7 text-sm text-gray-600 hover:text-gray-900'
            >
              حساب کاربری دارید؟ به حساب خود وارد شوید
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
