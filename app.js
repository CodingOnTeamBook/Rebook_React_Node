const express = require('express');
const app = express();
const path = require('path');
// const morgan = require('morgan');
const cors = require('cors');
// const { sequelize } = require('./models');

app.set('port', process.env.PORT || 5000);

//서버 실행시 MySQL과 연결
// sequelize
//   .sync({ force: false }) //force: true서버 실행시마다 테이블 재생성
//   .then(() => {
//     console.log('success connecting db');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   next(error);
// });

//frontend test용
app.get('/api/users/auth', (req, res) => {
  res.json({
    success: true,
    isAuth: false,
  });
});
app.post('/api/users/login', (req, res) => {
  //가입한 유저일 때, success :true, type: 1, userId, 토큰 발행하기
  //가입안 한 유저일 때, success: true, type: 0  토큰 발행 안함.
  //DB 조회 실패, success: false, error: '에러메세지'
  res.json({
    // success: true,
    // type: 1,
    // userId: req.body.kakaoId,
    success: true,
    type: 0,
    userId: req.body.kakaoId,
  });
});
app.post('/api/users/signup', (req, res) => {
  res.json({
    success: true,
    userId: req.body.userId,
    nickname: req.body.nickname,
    genre: req.body.genre,
    gender: req.body.gender,
    avartarImg: req.body.avartarImg,
  });
});
app.delete('/api/users/logout', (req, res) => {
  res.json({
    success: true,
    userId: req.body.userId,
    error: '',
  });
});
app.get('check', (req, res) => {
  res.json({
    success: true,
    userId: req.body.userId,
  });
});

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
