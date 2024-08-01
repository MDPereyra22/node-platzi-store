const express = require('express');
const CategoryService = require('../services/categories.service');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();

const service = new CategoryService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const category = service.findOne(id);
      res.json(category);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  },
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
);
module.exports = router;
