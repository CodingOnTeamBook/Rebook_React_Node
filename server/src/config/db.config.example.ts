//db.config.ts파일을 다음과 같이 작성해주세요.

import { IdbAttr } from './db.interface';

export const DevDBConfg: IdbAttr = {
  host: 'localhost',
  port: 3306,
  username: 'mysql db 유저 네임',
  password: 'mysql db 유저 패스워드',
  database: 'db를 저장할 database이름',
};
