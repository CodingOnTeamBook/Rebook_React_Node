import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';

export const reviewmulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/review`);
    },
    filename: (req, file, cb) => {
      cb(null, `${req.body.writer}_${Date.now()}_${file.originalname}`);
    },
    filefilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      if (ext === '.html' || 'jpg') cb(null, true);
      else
        cb(
          new HttpException('only html is allowed', HttpStatus.BAD_REQUEST),
          false
        );
    },
  }),
};

export const uploadReviewHtml = async (file): Promise<string> => {
  return `review/${file.filename}`;
};
