const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/user');

const roadmapSchema = new Schema({
  body: {
    long: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    mid: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    short: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    intermediate: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    today: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    }
  },
  mind: {
    long: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    mid: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    short: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    intermediate: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    today: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    }
  },
  soul: {
    long: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    mid: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    short: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    intermediate: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    today: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    }
  },
  social: {
    long: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    mid: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    short: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    intermediate: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    },
    today: {
      description: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        require: true
      }
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  usePushEach: true
});

// Create a model
const Roadmap = mongoose.model('roadmap', roadmapSchema);

// Export the model
module.exports = Roadmap;