const passport = require('passport');

module.exports = {
  passportJWT: passport.authenticate('jwt', { session: false }),
  ROADMAP: 'roadmap',
}