const Project = require('../models/project');

// eslint-disable-next-line consistent-return
exports.getAllProjects = async (_, res) => {
  try {
    const projects = await Project.find();
    if (projects.length === 0) {
      res.json({ message: 'no projects in the database' });
      return 'no projects in the database';
    }
    res.json(projects);
    return projects;
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// eslint-disable-next-line consistent-return
exports.getOneProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      res
        .status(422)
        .json({ message: "the project you are looking for wasn't found" });
      return "the project you are looking for wasn't found";
    }
    res.json(project);
    return project;
  } catch (err) {
    res.status(422).json({ message: err.message });
    return err.message;
  }
};

// eslint-disable-next-line consistent-return
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

// eslint-disable-next-line consistent-return
exports.filterProjects = async (req, res) => {
  const { creator, location } = req.query;
  if (!creator && !location) {
    res
      .status(400)
      .json({ message: 'make sure you send a valid query parameter' });
  } else {
    const query = {};
    if (creator) query.creator = creator;
    if (location) query.location = location;
    try {
      const projects = await Project.find(query);
      if (projects.length === 0) {
        res.status(422).json({ message: 'No projects by these parameters' });
        return 'projects';
      }
      res.json(projects);
      return projects;
    } catch (err) {
      res.status(422).json({ message: err.message });
      return err.message;
    }
  }
};

// eslint-disable-next-line consistent-return
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedProject) {
      res
        .status(422)
        .json({ message: "the project you are trying to update wasn't found" });
      return "the project you are trying to update wasn't found";
    }
    res.json(updatedProject);
    return updatedProject;
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
  project.save();
  res.send('your application was successfully passed');
};
