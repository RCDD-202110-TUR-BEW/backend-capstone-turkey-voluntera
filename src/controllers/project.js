const Project = require('../models/project');

exports.getAllProjects = async (_, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getOneProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      res
        .status(422)
        .json({ message: "the project you are looking for wasn't found" });
    } else {
      res.json(project);
    }
  } catch (err) {
    next(err);
  }
};

exports.addProject = async (req, res, next) => {
  const projectData = req.body;
  try {
    const newProject = await Project.create(projectData);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

exports.filterProjects = async (req, res, next) => {
  const { creator, address } = req.query;
  if (!creator && !address) {
    res
      .status(400)
      .json({ message: 'make sure you send a valid query parameter' });
  } else {
    const query = {};
    if (creator) query.creator = creator;
    if (address) query.address = address;
    try {
      const projects = await Project.find(query);
      if (projects.length) {
        res.json({ message: 'No matching documents found' });
      } else {
        res.json(projects);
      }
    } catch (err) {
      next(err);
    }
  }
};

exports.updateProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProject) {
      res
        .status(422)
        .json({ message: "the project you are trying to update wasn't found" });
    } else {
      res.json(updatedProject);
    }
  } catch (err) {
    next(err);
  }
};

exports.removeProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (project) {
      res.json({ message: 'Successfully deleted' });
    } else {
      res.status(422).json({ message: 'Could not find project' });
    }
  } catch (err) {
    next(err);
  }
};

exports.addApplication = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (project) {
      project.applications.push(req.body);
      await project.save();
      res.json({ updatedProject: project });
    } else {
      res.json({ message: 'Could not find project' });
    }
  } catch (err) {
    next(err);
  }
};
