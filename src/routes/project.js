const express = require('express');
const checkAuthentication = require('../middlewares/checkAuth');

const router = express.Router();

const projectController = require('../controllers/project');

router.get('/', projectController.getAllProjects);
router.post('/', checkAuthentication, projectController.addProject);
router.get('/filter', projectController.filterProjects);
router.get('/:id', projectController.getOneProject);
router.put('/:id', checkAuthentication, projectController.updateProject);
router.delete('/:id', checkAuthentication, projectController.removeProject);
router.post(
  '/:id/applications',
  checkAuthentication,
  projectController.addApplication
);

module.exports = router;
