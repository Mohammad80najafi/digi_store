'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { UpdateProductAction } from '@/actions/product-actions';
import { useRouter } from 'next/navigation';
import { S3UploadAction } from '@/actions/S3BucketAction';

const EditProductForm = ({ product }: any) => {
  const router = useRouter();

  const [imagePath, setImagePath] = useState<string>('');
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [imageAvaliable, setImageAvaliable] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setName(product?.name);
    setDescription(product?.description);
    setPrice(product?.price);
    setCategory(product?.category);
    setImage(product?.image);
  }, []);

  const submitForm = async (formData: FormData) => {
    formData.set('id', product?.id);
    formData.set('imagePath', imagePath);
    const res = await UpdateProductAction(formData, product?.id);
    if (res?.sucess) {
      alert('محصول با موفقیت ویرایش شد');
    } else {
      alert(res.msg);
    }
  };

  const handleUploadImage: any = async (e: any) => {
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

  return (
    <div className=''>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div>
            <h1 className='text-md mb-4 text-center font-bold text-black dark:text-gray-200 md:text-xl'>
              ویرایش محصول
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
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
                {imagePath ? (
                  <Image
                    src={imagePath}
                    alt='product-img'
                    width={50}
                    height={50}
                    className='rounded-md border object-cover shadow-md'
                  />
                ) : (
                  <Image
                    src={image}
                    alt='product-img'
                    width={50}
                    height={50}
                    className='rounded-md border object-cover shadow-md'
                  />
                )}
              </label>
            </div>
            <button
              disabled
              type='submit'
              className={`w-full cursor-pointer rounded`}
            >
              <button
                className={`rounded bg-primary ${isImageUploading ? 'animate-bounce bg-gray-600' : ''} w-full cursor-pointer`}
                type='submit'
                disabled={isImageUploading || !imageAvaliable}
              >
                ویرایش
              </button>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
