const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.post('/', categoriesController.add);
categoriesRouter.get('/', categoriesController.getAll);

module.exports = categoriesRouter; 