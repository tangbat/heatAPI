const Joi = require('joi');

const Roadmap = require('../models/roadmap');

module.exports = {
  // Check for roadmap permission
  // If no paramter just checks if admins 
  roadmapAuth: (roadmapId = '') => {
    return async (req, res, next) => {
      // check if admin or has permission
      if (req.user.role.includes('ADMIN')) {
        next();
      } else if (roadmapId != '') {
        const foundRoadmap = await Roadmap.findById(req.params[roadmapId]);

        if (foundRoadmap.createdBy == req.user.id) {
          next();
        }

        return res.status(401).json({ success: false, message: 'Unauthorized' });
      } else {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    }
  },

  // Check for user permission
  userAuth: (userId = '') => {
    return (req, res, next) => {
      // check if admin or has permission
      if (req.user.role.includes('ADMIN')) {
        next();
      } else if (userId != '') {
        if (req.user.id == req.params[userId]) {
          next();
        }

        return res.status(401).json({ success: false, message: 'Unauthorized' });
      } else {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {        
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  validateParam: (schema, names) => {
    return (req, res, next) => {
      const result = names.split(" ");

      result.forEach(function (name) {
        const result = Joi.validate({ param: req.params[name] }, schema);
        if (result.error) {
          return res.status(400).json(result.error);
        }

        if (!req.value) { req.value = {}; }
        if (!req.value.params) { req.value.params = {}; }

        req.value.params[name] = result.value.param;
      });

      next();
    }
  },

  uniqueUser: (array) => {
    let itemIds = Object.create(null);

    for (let i = 0; i < array.length; ++i) {
      const value = array[i].user;
      if (value in itemIds) {
        return false;
      }
      itemIds[value] = true;
    }

    return true;
  },

  unique: (array) => {
    let itemIds = Object.create(null);

    for (let i = 0; i < array.length; ++i) {
      const value = array[i];
      if (value in itemIds) {
        return false;
      }
      itemIds[value] = true;
    }

    return true;
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  }
}