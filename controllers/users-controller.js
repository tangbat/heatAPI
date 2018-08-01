const JWT =  require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

// const nodemailer = require('nodemailer'); // Import Nodemailer Package
// const sgTransport = require('nodemailer-sendgrid-transport'); // Import Nodemailer Sengrid Transport Package

signToken = (user) => {
    // Respond with token
    return JWT.sign({
      userId: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    }, config.secret, { expiresIn: '24h'});
}
  

module.exports = {
    getCurrentUser: async (req, res, next) => {
        const jwtUserId = req.user._id;

        let foundUser = await User.findOne( { _id: jwtUserId }, { password: 0, resetToken: 0 } );
        if (foundUser){
            return res.status(200).json(foundUser);
        }
        res.status(404).send();

    },
    newUser: async (req, res, next) => {
        const { email, password, username, firstName, lastName, phone } = req.value.body;
        
        // Check if there is a user with the same email
        let foundUser = await User.findOne({ email });
        if (foundUser) { 
        return res.status(403).json({ success: false, message: 'Email is already in use'});
        }

        foundUser = await User.findOne({ username });
        if (foundUser) { 
        return res.status(403).json({ success: false, message: 'username is already in use'});
        }

        if (req.value.body.referral) {
            // check if referral username is real
            
            foundUser = await User.findOne({ 'username': req.value.body.referral });
            if (!foundUser) {
                return res.status(403).json({ success: false, message: 'Referred User not found' });
            }

            const newUser = new User({ email, password, username, firstName, lastName, phone, role: ["NORMAL_USER"], referredBy: foundUser.id });
            console.log(newUser);
            await newUser.save();
        } else {
            // Create a new User
            const newUser = new User({ email, password, username, firstName, lastName, phone, role: ["NORMAL_USER"] });
            await newUser.save();
        }

        // Respond with token
        res.status(201).json({ success: true, message: 'User registered' });
    },
    replaceUser: async (req, res, next) => {

        // enforce that req.body must contain all the fields
        const { email, password, username, firstName, lastName, phone } = req.value.body;
        const jwtUserId = req.user._id;
        const paramsUserId = req.value.params.userId;
        // user can only edit himself
        if (!(req.user.role.includes('ADMIN_USER')) && jwtUserId != paramsUserId){
            return res.status(404).send({ success: false, message: 'Not Found' });
        }

        let foundUser = await User.find().where('_id').ne(paramsUserId).where('email').equals(email);
        if (foundUser.length) {
            return res.status(403).json({ success: false, message: 'Email is already in use'});
        }

        foundUser = await User.find().where('_id').ne(paramsUserId).where('username').equals(username);
        if (foundUser.length) { 
            return res.status(403).json({ success: false, message: 'Display name is already in use'});
        }

        const newUser = req.value.body;
        
        foundUser = await User.findById(jwtUserId);
        if (!foundUser){
            return res.status(404).send({ success: false, message: 'Not Found' });
        }

        Object.assign(foundUser, newUser);
    
        await foundUser.save();

        res.status(200).json({ success: true, message: 'User updated' });    
    },
    
    updatePassword: async (req, res, next) => {

        // enforce that req.body must contain all the fields
        const { oldPassword, newPassword } = req.value.body;
        const jwtUserId = req.user._id;

        // user can only edit himself
        if (!(req.user.role.includes('ADMIN_USER')) && jwtUserId != req.value.params.userId){
            return res.status(404).send();
        }
        
        foundUser = await User.findById(jwtUserId);
        if (!foundUser){
            return res.status(404).send();
        }
        
        const isMatch = await foundUser.isValidPassword(oldPassword);
        if (!isMatch) {
            return res.status(403).json({ success: false, message: 'Old password is incorrect'});
        }
        foundUser.password = newPassword;
        await foundUser.save();

        res.status(200).json({ success: true, message: 'User updated' });    
      },

    /* login and sign a token for the client */
    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
}