const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('express');
app.use(cors());
app.use(express.json());

//frontend test용
app.get('/api/users/auth', (req, res) => {
  res.json({
    success: true,
    isAuth: true,
  });
});
app.post('/api/users/login', (req, res) => {
  res.json({
    success: true,
    userId: '12345',
  });
});
app.post('/api/users/signup', (req, res) => {
  res.json({
    success: true,
    userId: req.body.userId,
    nickname: req.body.nickname,
    genre: request.body.genre,
    gender: req.body.gender,
    avartarImg: req.body.avartarImg,
  });
});
app.delete('/api/users/logout', (req, res) => {
  res.json({
    success: true,
    userId: req.body.userId,
  });
});

app.listen(5000, () => {
  console.log('server on port 5000');
});
