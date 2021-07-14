import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';

export const usersmulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/users`);
    },
    filename: (req, file, cb) => {
      cb(null, `${req.user.nickname}_${file.originalname}`);
    },
    filefilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      if (ext === 'jpg' || 'png') cb(null, true);
      else
        cb(
          new HttpException(
            'only jpg, png are allowed',
            HttpStatus.BAD_REQUEST
          ),
          false
        );
    },
  }),
};

export const uploadProfileImg = async (file): Promise<string> => {
  return `users/${file.filename}`;
};
