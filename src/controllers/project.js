const Project = require('../models/project');

exports.getAllProjects = async (_, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.getOneProject = async (req, res) => {
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
    res.status(422).json({ message: err.message });
  }
};

exports.addProject = async (req, res) => {
  const projectData = req.body;
  try {
    const newProject = await Project.create(projectData);
    res.status(201).json(newProject);
    return projectData;
  } catch (err) {
    res.status(422).json({ message: err.message });
    return err.message;
  }
};

exports.filterProjects = async (req, res) => {
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
      res.json(projects);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }
};

exports.updateProject = async (req, res) => {
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
    res.status(422).json({ message: err.message });
  }
};

exports.removeProject = (req, res) => {
  Project.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(422);
      return res.json({ err: 'Not deleted' });
    }
    return res.status(204).send();
  });
};

exports.addApp = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  project.applications.push(req.body);
  await project.save();
  res.json({ updatedProject: project });
};
