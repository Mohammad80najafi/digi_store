'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'default',
  endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_KEY as string,
  },
});

export const S3UploadAction = async (data: FormData) => {
  const file: File | null = data.get('file') as File;

  if (!file) throw new Error('فایلی بارگذاری نکرده اید');

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ImageName = `${Date.now()}-${file.name}`;

  const params = {
    Bucket: 'digi-store',
    Key: ImageName,
    Body: buffer,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    return {
      success: true,
      imagePath: `https://digi-store.storage.c2.liara.space/${ImageName}`,
    };
  } catch (e) {
    return { e };
  }
};
