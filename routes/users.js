const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../config/passport'); // somehow need this

const { validateBody, validateParam, schemas, userAuth } = require('../helpers/route-helpers');
const userSchemas = require('../helpers/user-helpers').schemas;
const UserController = require('../controllers/users-controller');

const passportSignIn = passport.authenticate('local', { session: false });
const { passportJWT } = require('../helpers/constants');

router.route('/')
  .post(
    validateBody(userSchemas.newUserSchema), 
    UserController.newUser  
  );

router.route('/signin')
  .post(validateBody(userSchemas.signinSchema), passportSignIn, UserController.signIn);

router.route('/:userId/updatePassword')
.put(
  passportJWT,
  userAuth('userId'),
  validateParam(schemas.idSchema, 'userId'),
  validateBody(userSchemas.updatePasswordSchema),
  UserController.updatePassword
);

router.route('/current-user')
  .get(
    passportJWT,
    UserController.getCurrentUser
  )

router.route('/:userId')
  .put(
    passportJWT,
    userAuth('userId'),
    validateParam(schemas.idSchema, 'userId'),
    validateBody(userSchemas.updateUserSchema),
    UserController.replaceUser
  );

module.exports = router;
