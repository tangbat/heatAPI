const Roadmap = require('../models/roadmap');


module.exports =  {
  /* Get all roadmaps */
  index: async (req, res, next) => {
    const roadmaps = await Roadmap.find({});
    res.status(200).json(roadmaps);
  },

  /* Create new roadmap */
  newRoadmap: async (req, res, next) => {
    const newRoadmap = new Roadmap(req.value.body);
    newRoadmap.createdBy = req.user._id;
    await newRoadmap.save();

    // Respond with token
    res.status(201).json({ success: true, message: 'Roadmap Created' });
  },

  getRoadmap: async (req, res, next) => {
    const { roadmapId } = req.value.params;

    const foundRoadmap = await Roadmap.findById(roadmapId);
    if (!foundRoadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }
    
    res.status(200).json(foundRoadmap);
  },

  replaceRoadmap: async (req, res, next) => {
    const { roadmapId } = req.value.params;
    const newRoadmap = req.value.body;

    // check if roadmap exists
    let foundRoadmap = await Roadmap.findById(roadmapId);
    if (!foundRoadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    Object.assign(foundRoadmap, newRoadmap);

    await foundRoadmap.save();

    res.status(200).json({ success: true, message: 'Roadmap updated' });
  },

  deleteRoadmap: async (req, res, next) => {
    const { roadmapId } = req.value.params;

    // check if roadmap exists
    let foundRoadmap = await Roadmap.findById(roadmapId);
    if (!foundRoadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }
    await foundRoadmap.remove();
    res.status(200).json({ success: true, message: 'Roadmap deleted' });
  }
}