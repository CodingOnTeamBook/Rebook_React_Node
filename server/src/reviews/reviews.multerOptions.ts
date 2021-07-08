import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
//import { existsSync, mkdirSync } from 'fs';
import { REVIEW_UPLOADPATH, COVER_UPLOADPATH } from 'src/config/upload.config';
import * as path from 'path';

export const reviewmulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      //폴더생성이 안됨 ㅜ
      //if (!existsSync(REVIEW_UPLOADPATH)) mkdirSync(REVIEW_UPLOADPATH);
      //if (!existsSync(COVER_UPLOADPATH)) mkdirSync(COVER_UPLOADPATH);

      const ext = path.extname(file.originalname);
      if (ext === '.html') {
        cb(null, `uploads/${REVIEW_UPLOADPATH}`);
      } else {
        cb(null, `uploads/${COVER_UPLOADPATH}`);
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      if (ext === '.html') {
        cb(null, `${req.body.writer}_${Date.now()}_${file.originalname}`);
      } else {
        //bookInfo.isbn으로 하고싶음 undefined나서 .bookInfo만
        cb(null, `${req.body.bookInfo}_${file.originalname}`);
      }
    },
    filefilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      if (ext === '.html' || 'jpg') cb(null, true);
      else
        cb(
          new HttpException(
            'only html, jpg is allowed',
            HttpStatus.BAD_REQUEST
          ),
          false
        );
    },
  }),
};

export const uploadReviewHtml = async (file): Promise<string> => {
  return `${REVIEW_UPLOADPATH}/${file[0].filename}`;
};

export const uploadBookCover = async (file): Promise<string> => {
  return `${COVER_UPLOADPATH}/${file[0].filename}`;
};
