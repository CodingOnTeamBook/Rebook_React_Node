const express = require('express');
//const passport = require('passport');
const { signToken } = require('./middlewares');
//const authRouter = require('./auth');
const { User } = require('../models');

const router = express.Router();

//닉네임 중복확인
router.get('/check/:nickname', async (req, res, next) => {
  const nickname = unescape(req.params.nickname);
  try {
    const exNick = await User.findOne({ where: { nickname } }); //컬럼명 똑같이 넣어줘야함!!!
    if (!exNick) {
      res.json({
        success: true,
        result: true,
      });
    } else {
      res.json({
        success: true,
        result: false,
      });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const userId = req.body.kakaoId; //바디 키 이름이랑 같아야함!!!!
  try {
    const exUser = await User.findOne({ where: { userId } });
    if (exUser) {
      res.json({
        userId: userId,
        success: true,
        type: 1,
        token: signToken(exUser),
      });
    } else {
      res.json({
        success: true,
        type: 0,
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err, //{"success":false,"error":{}} err에 뭐 안담겨있음
    });
    return next(err);
  }
});

router.post('/signup', async (req, res) => {
  const { kakaoId, nickname, genre, gender, avartarImg, age_range } = req.body;
  try {
    await User.create({
      userId: kakaoId,
      provider: 'kakao',
      nickname: nickname,
      gender: gender,
      age_range: age_range,
      user_img: avartarImg,
    }).then((x) => {
      res.json({
        success: true,
        userId: x.get('userId'),
      });
    });
  } catch (err) {
    res.json({
      success: false,
      error: err,
    });
  }
});

router.get('/logout', (req, res) => {});

module.exports = router;
// test
