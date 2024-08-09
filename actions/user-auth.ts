'use server';

import { signIn, signOut } from '@/auth';
import { prismadb } from '@/prismadb';
import { revalidatePath } from 'next/cache';
import { Role } from '@prisma/client';

type EditUserActionProps = {
  name: string;
  email: string;
  password: string;
  userRoleUser: string;
  userRoleAdmin: string;
  id: string;
};

export const GetUserByEmailAction = async (email: string) => {
  const decodeEmail = decodeURIComponent(email);
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email: decodeEmail as string,
      },
    });
    return user;
  } catch (error) {
    console.log('error in get user by email action', error);
  }
};

export const GetUserByIdAction = async (id: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: id as string,
      },
    });
    return user;
  } catch (error) {
    console.log('error in get user by id action', error);
  }
};

export const UserLoginGithubAction = async (provider: string) => {
  await signIn('github', { redirectTo: '/' });
  revalidatePath('/');
};

export const UserLoginCredentialsAction = async (formdata: FormData) => {
  const { email, password } = Object.fromEntries(formdata);
  await signIn('credentials', { email, password, redirectTo: '/' });
  revalidatePath('/');
};

export const CreateUserAction = async (formdata: FormData) => {
  try {
    const { name, email, password } = Object.fromEntries(formdata);

    const existsUser = await prismadb.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (existsUser) return { sucess: false, message: 'ایمیل قبلا ثبت شده است' };

    const user = await prismadb.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: password as string,
      },
    });
    if (!user) return { sucess: false, message: 'خطا در ساخت حساب کاربری' };
    return { sucess: true, message: 'حساب کاربری با موفقیت ساخته شد' };
  } catch (error) {
    console.log('error in create user action', error);
  }
};

export const UserLogOutAction = async () => {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
};

export const CreateDashboardUserAction = async (formdata: FormData) => {
  try {
    const { name, email, password, userRoleUser, userRoleAdmin } =
      Object.fromEntries(formdata);

    let userSelectedRole = userRoleUser === 'on' ? 'USER' : 'ADMIN';

    const existsUser = await prismadb.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (existsUser) return { sucess: false, message: 'ایمیل قبلا ثبت شده است' };

    const user = await prismadb.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: password as string,
        role: userSelectedRole as Role,
      },
    });
    if (user) {
      revalidatePath('/dashboard/users');
      revalidatePath('/dashboard');
      return { sucess: true, message: 'حساب کاربری با موفقیت ساخته شد' };
    } else {
      return { sucess: false, message: 'خطا در ساخت حساب کاربری' };
    }
  } catch (error) {
    console.log('error in create user action', error);
  }
};

export const GetAllUsersAction = async () => {
  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return users;
  } catch (error) {
    console.log('error in get all users action', error);
  }
};

export const GetAllUsersCountAction = async () => {
  try {
    const users = await prismadb.user.count();
    return users;
  } catch (error) {
    console.log('error in get all users action', error);
  }
};

export const GetAllAdminUsersCount = async () => {
  try {
    const AllAdminsCount = await prismadb.user.count({
      where: {
        role: 'ADMIN',
      },
    });
    return AllAdminsCount;
  } catch (error) {
    console.log('error from  GetAllAdminUsersCount', error);
  }
};

export const DeleteUserAction = async (id: string) => {
  try {
    const res = await prismadb.user.delete({
      where: {
        id,
      },
    });
    if (res) {
      revalidatePath('/dashboard/users');
      revalidatePath('/dashboard');
      return { success: true, message: 'حساب کاربری با موفقیت حذف شد' };
    } else {
      return { success: false, message: 'در حذف حساب کاربر مشکلی پیش آمد' };
    }
  } catch (error) {
    console.log('error in delete user action', error);
  }
};

export const EditUserAction = async (formdata: EditUserActionProps) => {
  console.log('formdata from edit user action', formdata);
  const { name, email, password, userRoleUser, id: userId } = formdata;
  try {
    let userSelectedRole = userRoleUser === 'on' ? 'USER' : 'ADMIN';
    const user = await prismadb.user.update({
      data: {
        name: name as string,
        email: email as string,
        password: password as string,
        role: userSelectedRole as Role,
      },
      where: {
        id: userId as string,
      },
    });
    if (user) {
      revalidatePath('/dashboard/users');
      revalidatePath('/dashboard');
      return { sucess: true, message: 'حساب کاربری با موفقیت به روز شد' };
    } else {
      return { sucess: false, message: 'خطا در به روز کردن حساب کاربری' };
    }
  } catch (error) {
    console.log('error in edit user action', error);
  }
};
