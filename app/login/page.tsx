"use client";

import { UserLoginCredentialsAction } from "@/actions/user-auth";
import SubmitButton from "@/components/auth/submit-button";
import Link from "next/link";

const SignIn = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-primary text-center font-bold text-2xl">
            دیجی شاپ
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ورود به حساب کاربری
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action={async (formdata) => UserLoginCredentialsAction(formdata)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ایمیل خود را وارد کنید
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  رمز عبور خود را وارد کنید
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <SubmitButton text="ورود به حساب کاربری" width="w-full" />
            <Link
              href="/register"
              className="mt-5 text-sm text-gray-600 hover:text-gray-900"
            >
              هیچ حساب کاربری ندارید؟ ثبت نام کنید
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
