const router = require('express-promise-router')();

const RoadmapController = require('../controllers/roadmaps-controller');
const { validateBody, validateParam, schemas, roadmapAuth } = require('../helpers/route-helpers');
const roadmapSchemas = require('../helpers/roadmap-helpers').schemas;
const { R, W, U, D, ROADMAP } = require('../helpers/constants');
const Roadmap = require('../models/roadmap');
const { passportJWT } = require('../helpers/constants');

router.route('/')
.get(
  passportJWT,
  roadmapAuth(),
  RoadmapController.index
)
.post(
  passportJWT,
  validateBody(roadmapSchemas.roadmapSchema),
  RoadmapController.newRoadmap
);

router.route('/:roadmapId')
.get(
  passportJWT,
  roadmapAuth('roadmapId'),
  validateParam(schemas.idSchema, 'roadmapId'), 
  RoadmapController.getRoadmap
)
.put(
  passportJWT,
  roadmapAuth('roadmapId'),
  validateParam(schemas.idSchema, 'roadmapId'), 
  validateBody(roadmapSchemas.roadmapSchema),  
  RoadmapController.replaceRoadmap
)
.delete(
  passportJWT,
  roadmapAuth('roadmapId'),
  validateParam(schemas.idSchema, 'roadmapId'), 
  RoadmapController.deleteRoadmap
);

module.exports = router;