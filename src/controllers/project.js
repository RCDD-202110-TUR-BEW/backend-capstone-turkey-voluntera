
const Project = require("../models/project");

exports.getAllProjects = (req, res) => {
    Project.find().then((data) => {
        return res.send(data);
    })
};

exports.getOneProject = (req, res) => {
    Project.findOne({ _id: req.params.id }, (err, data) => {
        if (err || !data) {
            res.status(422);
            return res.send({ err: `No post with this id: ${req.params.id}` });
        }
        return res.send(data);
    });
};

exports.addProject = (req, res) => {
    async function saveData() {
        const thisProject = new Project({ ...req.body });
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
        Project.find({ ...isFilterdByNgo, ...isFilteredByTag }, (err, data) => {
            if (!data.length || err) {
                res.status(422);
                return res.send({ err: "No Project found" });
            }
            return res.send(data);
        });
    } else {
        res.status(400);
        return res.send({ err: "Projects can only be filtered by 'ngo' or 'tag'" });
    }
};

exports.updateProject = (req, res) => {
    Project.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
        if (err) {
            return res.send({ err });
        }
        return res.send(data);
    });
};

exports.removeProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(422);
            return res.send({ err: "Not deleted" });
        }
        return res.status(204).send({ message: "Document deleted succesfully" });
    });
};

exports.addApp = (req, res) => {
    Project.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(422);
            return res.send({ err: `No Project with this id: ${req.params.id}` });
        }
        data.save((err, data) => {
            if (err) {
                res.status(422);
                return res.send({ err: err });
            }
            return res.send(data);

        });
    });
};
