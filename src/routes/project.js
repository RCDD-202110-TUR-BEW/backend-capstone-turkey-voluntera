const express = require('express');

const router = express.Router();

const projectController = require('../controllers/project');

router.get(projectController.getAllProjects);
router.post('/add', projectController.addProject);
router.get('/filter', projectController.filterProjects);
router.get('/:id', projectController.getOneProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.removeProject);
router.post('/app/:id', projectController.addApp);

module.exports = router;
