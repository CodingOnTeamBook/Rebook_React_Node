import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

import { accessKeyId, region, secretAccessKey } from 'src/config/s3.config';

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

export const usersmulterOptions = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'rebookbucket',
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `users/${req.body.nickname}_${Date.now()}_${file.originalname}`);
    },
  }),
});

export const uploadProfileImg = async (file): Promise<string> => {
  return `${file.key}`;
};

export const deleteProfileImg = async (key): Promise<any> => {
  const params = { Bucket: 'rebookbucket', Key: key };
  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log('delete', key);
  });
};

export const getSignedUrlofProfileImg = (key): string => {
  const params = { Bucket: 'rebookbucket', Key: key };
  return s3.getSignedUrl('getObject', params);
};
