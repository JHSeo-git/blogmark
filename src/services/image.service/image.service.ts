import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mimeTypes from 'mime-types';

if (!process.env.R2_ACCESS_KEY || !process.env.R2_SECRET_KEY) {
  throw new Error('Please define the R2_ACCESS_KEY and R2_SECRET_KEY environment variables');
}

if (!process.env.R2_ACCOUNT_ID) {
  throw new Error('Please define the R2_ACCOUNT_ID environment variable');
}

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
  imageUrl: string;
}

const imageService = {
  // async upload({ imageUrl }: UploadParams) {
  //   const blob = await downloadImage(imageUrl);
  //   const contentType = mimeTypes.lookup(filename) || 'image/png';
  //   const extenstion = mimeTypes.extension(contentType);
  //   const command = new PutObjectCommand({
  //     Bucket: process.env.R2_BUCKET,
  //     Key: `${uuidv4()}.${extenstion}`,
  //     Body: blob,
  //     ContentType: contentType,
  //   });
  //   r2.send(command);
  //   return signedUrl;
  // },
};

const downloadImage = async (url: string) => {
  const response = await fetch(url);

  const blob = await response.blob();

  return blob;
};

const getPresignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
  });

  const signedUrl = await getSignedUrl(r2, command, {
    expiresIn: 60 * 60,
  });

  return signedUrl;
};

export default imageService;
