const jwt = require('jsonwebtoken');
/*
    passport는 req객체에 isAuthenticated 메서드를 추가한다.
    로그인 중이면 true반환, 그렇지 않으면 false를 반환한다. 로그인여부 확인용!
*/

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('login please!');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('이미 로그인 한 상태입니다.');
    res.redirect(`./?error=${message}`);
  }
};

exports.signToken = (req) => {
  return jwt.sign(
    {
      userId: req.snsId,
    },
    process.env.JWT_SECRET, //비밀키 역시 일단 서버측 .env파일에 임의
    { expiresIn: '3d', subject: 'login' } //토큰 유효기간 임의!
  );
};

exports.verifyToken = (req, res, next) => {};
