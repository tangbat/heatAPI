const Joi = require('joi');

module.exports = {
    schemas: {
        // Password schema for routes that requires the password input
        newUserSchema: Joi.object().keys({
            email: Joi.string().email().required().lowercase().trim(),
            username: Joi.string().required().lowercase().trim(),
            password: Joi.string().trim().required(),
            firstName: Joi.string().lowercase().trim().allow(''),
            lastName: Joi.string().lowercase().trim().allow(''),
            phone: Joi.string().regex(/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/).allow(''),
            referral: Joi.string().lowercase().trim()
        }),

        updateUserSchema: Joi.object().keys({
            email: Joi.string().email().required().lowercase().trim(),
            username: Joi.string().required().lowercase().trim(),
            firstName: Joi.string().lowercase().trim().allow(''),
            lastName: Joi.string().lowercase().trim().allow(''),
            phone: Joi.string().regex(/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/).allow('')
        }),
      
        signinSchema: Joi.object().keys({
            username: Joi.string().lowercase().required().trim(),
            password: Joi.string().required().trim()
        }),

        resetSchema: Joi.object().keys({
            resetToken: Joi.string().required(),
            password: Joi.string().required().trim()
        }),

        updatePasswordSchema: Joi.object().keys({
            oldPassword: Joi.string().required().trim(),
            newPassword: Joi.string().required().trim()
        }),
      
        emailSchema: Joi.object().keys({
            email: Joi.string().email().required().lowercase()
        })
    }
}