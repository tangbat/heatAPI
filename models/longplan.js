const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const longplanSchema = new Schema({
  end: {
    type: String,
    required: true
  },
  middle: [{
    type: String
  }],
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String
  },
  createdBy: {
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

longplanSchema.pre('save', async function (next) {
  try {
    // Update lastchange on save
    this.lastChange = new Date().toISOString();
    next();
  } catch (error) {
    next(error);
  }
});

const Longplan = mongoose.model('longplan', longplanSchema);
module.exports = Longplan;