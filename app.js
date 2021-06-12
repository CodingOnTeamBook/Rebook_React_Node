const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.set('port', process.env.PORT || 5000);

//서버 실행시 MySQL과 연결
sequelize
  .sync({ force: false }) //force: true서버 실행시마다 테이블 재생성
  .then(() => {
    console.log('success connecting db');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'from node server',
  });
});

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
