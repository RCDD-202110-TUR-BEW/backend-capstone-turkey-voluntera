

const project = require("../models/project");

exports.getAllProjects = (req, res) => {
    project.find().then((data) => {
        return res.send(data);
    });
};

exports.getOneProject = (req, res) => {
    project.findOne({ _id: req.params.id }, (err, data) => {
        if (err || !data) {
            res.status(422);
            return res.send({ err: `No post with this id: ${req.params.id}` });
        }
        return res.send(data);
    });
};

exports.addProject = (req, res) => {
    async function saveData() {
        const thisProject = new project({ ...req.body });
        try {
            const body = await thisProject.save();
            return res.status(201).send(body);
        } catch (err) {
            res.status(422);
            return res.send({ err });
        }
    }
    saveData();
};

exports.filterProjects = (req, res) => {
    const { ngo, tag } = req.query;
    const isFilteredByTag = tag ? { tags: { $in: tag } } : {};
    const isFilterdByNgo = ngo ? { "ngo.name": ngo } : {};
    if (ngo || tag) {
        project.find({ ...isFilterdByNgo, ...isFilteredByTag }, (err, data) => {
            if (!data.length || err) {
                res.status(422);
                return res.send({ err: "No project found" });
            }
            return res.send(data);
        });
    } else {
        res.status(400);
        return res.send({ err: "Projects can only be filtered by 'ngo' or 'tag'" });
    }
};

exports.updateProject = (req, res) => {
    project.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
        if (err) {
            return res.send({ err });
        }
        return res.send(data);
    });
};

exports.removeProject = (req, res) => {
    project.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(422);
            return res.send({ err: "Not deleted" });
        }
        return res.status(204).send({ message: "Document deleted succesfully" });
    });
};

exports.addApp = (req, res) => {
    project.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(422);
            return res.send({ err: `No project with this id: ${req.params.id}` });
        }
        data.save((err, data) => {
            if (err) {
                res.status(422);
                return res.send({ err: err });
            } else {
                return res.send(data);
            }
        });
    });
};
