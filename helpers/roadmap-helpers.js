const Joi = require('joi');

module.exports = {
  schemas: {
    roadmapSchema: Joi.object().keys({
      body: Joi.object().keys({
        long: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        mid: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        short: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        intermediate: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        today: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        })
      }),
      mind: Joi.object().keys({
        long: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        mid: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        short: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        intermediate: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        today: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        })
      }),
      soul: Joi.object().keys({
        long: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        mid: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        short: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        intermediate: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        today: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        })
      }),
      social: Joi.object().keys({
        long: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        mid: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        short: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        intermediate: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        }),
        today: Joi.object().keys({
          description: Joi.string().required().trim(),
          score: Joi.number().required()
        })
      })
    })
  }
}  