const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortplanSchema = new Schema({
  projects: {
    type: String,
    unique: true,
    required: true
  },
  priorities: {
    type: String
  },
  people: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastChange: {
    type: Date,
    default: Date.now
  }
});

shortplanSchema.pre('save', async function (next) {
  try {
    // Update lastchange on save
    this.lastChange = new Date().toISOString();
    next();
  } catch (error) {
    next(error);
  }
});

const Shortplan = mongoose.model('shortplan', shortplanSchema);
module.exports = Shortplan;