'use server';

import { prismadb } from '@/prismadb';
import { revalidatePath } from 'next/cache';

export const CreateProductAction = async (data: FormData) => {
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const price = data.get('price') as string;
  const category = data.get('category') as any;
  const imagePath = data.get('imagePath') as any;

  const res = await prismadb.product.create({
    data: {
      name,
      description,
      price,
      image: imagePath,
    },
  });
  if (res) {
    revalidatePath('/dashboard/products');
    revalidatePath('/dashboard');
    revalidatePath('/');
    return { sucess: true };
  }
  return { sucess: false, msg: 'خطا در ایجاد محصول' };
};

export const UpdateProductAction = async (data: FormData, id: string) => {
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const price = data.get('price') as string;
  const category = data.get('category') as any;
  const imagePath = data.get('imagePath') as any;

  console.log('log from update product server', imagePath);

  const res = await prismadb.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      price,
      image: imagePath,
    },
  });
  if (res) {
    revalidatePath('/dashboard/products');
    revalidatePath('/dashboard');
    revalidatePath('/');
    return { sucess: true };
  }
  return { sucess: false, msg: 'خطا در ویرایش محصول' };
};

export const DeleteProductAction = async (id: string) => {
  const res = await prismadb.product.delete({
    where: {
      id,
    },
  });
  if (res) {
    revalidatePath('/dashboard/products');
    return { sucess: true };
  }
  return { sucess: false, msg: 'خطا در حذف محصول' };
};
