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

export const GetAllProductsCountAction = async () => {
  const res = await prismadb.product.count();
  return res;
};

export const GetAllProductsAction = async () => {
  const res = await prismadb.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res;
};

export const BuyProductAction = async (data: any) => {
  const id = data.get('id') as string;
  const userId = data.get('userId') as string;
  const productId = data.get('productId') as string;

  try {
    const exitstProduct = await prismadb.product.findUnique({
      where: {
        id,
      },
    });
    if (exitstProduct) {
      return {
        success: true,
        msg: 'این محصول از قبل در سبد خرید شما موجود است',
      };
    }

    const res = await prismadb.order.create({
      data: {
        userId,
        productId,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const GetTenProductsAction = async () => {
  const res = await prismadb.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  return res;
};

export const GetLastProductsAction = async () => {
  try {
    const products = await prismadb.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
    });
    return products;
  } catch (error) {
    console.log('error in get last products action', error);
  }
};

