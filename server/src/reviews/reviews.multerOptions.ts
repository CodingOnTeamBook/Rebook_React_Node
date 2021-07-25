import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

import { accessKeyId, region, secretAccessKey } from 'src/config/s3.config';
import { HttpException, HttpStatus } from '@nestjs/common';

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

export const uploadTxt = async (txtfile) => {
  fs.readFile(`./uploads/${txtfile}`, (err, data) => {
    if (err) {
      console.log('error with readFile');
      return new HttpException('error with readFile', HttpStatus.BAD_REQUEST);
    }
    const params = {
      Bucket: 'rebookbucket',
      Key: txtfile,
      Body: JSON.stringify(data, null, 2),
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        return new HttpException(
          'error with upload to S3',
          HttpStatus.BAD_REQUEST
        );
      }
      return true;
    });
  });
};

const storage = multerS3({
  s3: s3,
  bucket: 'rebookbucket',
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, `review/${req.body.writer}_${Date.now()}_${file.originalname}`);
  },
});

export const reviewmulter = multer({ storage: storage });

export const uploadReviewTxt = async (file): Promise<string> => {
  return `${file.key}`;
};

export const deleteReviewTxt = async (key): Promise<any> => {
  const params = { Bucket: 'rebookbucket', Key: key };
  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log('delete', key);
  });
};

export const getReviewTxt = async (key): Promise<any> => {
  const params = { Bucket: 'rebookbucket', Key: key };
  s3.getObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      console.log(data);
      return data;
    }
  });
};
