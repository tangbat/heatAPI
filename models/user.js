const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    website: {
        type: String
    },
    info: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    recentLogin: {
        type: Date
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    resetToken: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastChange: {
      type: Date,
      default: Date.now
    },
    // {NORMAL_USER,ADMIN,SUPER_ADMIN}
    role: {
        type: String,
        required: true
    },
	referredBy:{
        type: Schema.Types.ObjectId,
        ref: 'user'
	}
})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            console.log('is not modified');
            next();
        }
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt);
        // Re-assign hashed versioAn over original, plain text password
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}


// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;