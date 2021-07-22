import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as path from 'path';

import { accessKeyId, region, secretAccessKey } from 'src/config/s3.config';
import { HttpException, HttpStatus } from '@nestjs/common';

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

export const s3Path = 'https://rebookbucket.s3.ap-northeast-2.amazonaws.com/';

export const usersmulterOptions = multer({
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      ext === '.jpg' ||
      ext === '.png' ||
      mimetype === 'image/jpg' ||
      mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      return cb(
        new HttpException('Only jpg, png are allowed', HttpStatus.BAD_REQUEST),
        false
      );
    }
  },
  storage: multerS3({
    s3: s3,
    bucket: 'rebookbucket',
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(
        null,
        `users/${req.params.nickname}_${Date.now()}_${file.originalname}`
      );
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
