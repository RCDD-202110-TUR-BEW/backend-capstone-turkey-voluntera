const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project");

router.get("/", projectController.getAllBlogPosts);
router.post("/", projectController.addProject);
router.get("/filter", projectController.filterProjects)
router.get("/:id", projectController.getOneProject);;
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.removeProject);
router.post("/:id/app", projectController.addApp);

module.exports = router;
