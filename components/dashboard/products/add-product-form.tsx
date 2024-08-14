'use client';

import { CreateProductAction } from '@/actions/product-actions';
import { S3UploadAction } from '@/actions/S3BucketAction';

import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiSolidImageAdd } from 'react-icons/bi';

const AddProductForm = () => {
  const router = useRouter();

  const [imagePath, setImagePath] = useState<string>('');
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [imageAvaliable, setImageAvaliable] = useState<boolean>(false);

  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = async (
    e: any,
  ) => {
    setIsImageUploading(true);
    const data = new FormData();
    data.set('file', e.target.files![0]);

    const res = await S3UploadAction(data);
    if (res.success) {
      setImagePath(res?.imagePath);
      setImageAvaliable(true);
      setIsImageUploading(false);
    }
  };

  const submitForm = async (formData: FormData) => {
    formData.set('imagePath', imagePath);
    const res = await CreateProductAction(formData);
    console.log('log from submit form', res);

    if (res?.sucess) {
      alert('محصول با موفقیت اضافه شد');
      router.push('/dashboard/products');
    } else {
      alert(res.msg);
    }
  };

  return (
    <div className=''>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div>
            <h1 className='text-md mb-4 text-center font-bold text-black dark:text-gray-200 md:text-xl'>
              اضافه کردن محصول
            </h1>
          </div>
          <form className='space-y-4' action={submitForm}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200'
              >
                نام محصول را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  type='name'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200'
              >
                توضیحات را وارد کنید
              </label>
              <div className='mt-2'>
                <textarea
                  name='description'
                  id='description'
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='flex items-center justify-center gap-2'>
              <label
                htmlFor='price'
                className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200'
              >
                قیمت را وارد کنید
              </label>
              <div className='mt-2'>
                <input
                  id='price'
                  name='price'
                  type='number'
                  placeholder='1---,---'
                  min='100,000'
                  max='100,000,000'
                  step='1000'
                  required
                  className='rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='name'
                className='block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200'
              >
                دسته بندی را وارد کنید
              </label>
              <div className='mt-2'>
                <select
                  id='category'
                  name='category'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option>مردانه</option>
                  <option>زنانه</option>
                  <option>نوجوان</option>
                  <option>کودکان</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor='imageFile'
                className='block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200'
              >
                تصویر را وارد کنید
              </label>
              <label className='flex cursor-pointer items-center justify-center rounded border-2 border-dashed py-2 hover:opacity-60'>
                <input type='file' hidden onChange={handleUploadImage} />
                <BiSolidImageAdd className='text-3xl dark:text-gray-200' />
              </label>
            </div>
            <button
              disabled={isImageUploading || !imageAvaliable}
              type='submit'
              className={`w-full cursor-pointer rounded ${isImageUploading || !imageAvaliable ? 'bg-gray-400' : 'bg-primary'} `}
            >
              <span className={`${isImageUploading ? 'animate-pulse' : ''} `}>
                {isImageUploading ? 'درحال بارگذاری' : 'اضافه کردن'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
