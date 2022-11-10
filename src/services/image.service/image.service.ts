import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import mimeTypes from 'mime-types';
import { nanoid } from 'nanoid';

if (!process.env.R2_ACCESS_KEY || !process.env.R2_SECRET_KEY) {
  throw new Error('Please define the R2_ACCESS_KEY and R2_SECRET_KEY environment variables');
}

if (!process.env.R2_ACCOUNT_ID) {
  throw new Error('Please define the R2_ACCOUNT_ID environment variable');
}

if (!process.env.R2_BUCKET_NAME) {
  throw new Error('Please define the R2_BUCKET_NAME environment variable');
}

// TODO: subdomain
const r2SiteUrl = 'https://pub-f32feec30d8e4eee8750681495853339.r2.dev';

/**
 * @see https://developers.cloudflare.com/r2/examples/aws-sdk-js-v3/
 */
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

interface UploadParams {
  id: number;
  imageUrl: string;
  type?: 'favicon' | 'thumbnail';
}

const imageService = {
  async upload({ id, imageUrl, type = 'favicon' }: UploadParams) {
    const buffer = await downloadImage(imageUrl);

    const contentType = mimeTypes.lookup(imageUrl) || 'image/png';
    const extenstion = mimeTypes.extension(contentType) || 'png';
    const key = `${type}/${id}/${nanoid()}.${extenstion}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await r2.send(command);

    const uploadedImageUrl = `${r2SiteUrl}/${key}`;

    return uploadedImageUrl;
  },
};

const downloadImage = async (url: string) => {
  const response = await fetch(url);

  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
};

export default imageService;
