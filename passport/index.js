const passport = require('passport');
//const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const Devuser = require('../models/devuser');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Devuser.findOne({
      where: { id },
      /*include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
          as: 'Followers',
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
          as: 'Followings',
        },
      ],*/
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  //local();
  kakao();
};
