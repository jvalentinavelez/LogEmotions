const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/log');
const { checkAuth } = require('../util/auth');
const { isValidDate } = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log(req.token);
    try {
      const logs = await getAll();
      res.json({ logs: logs });
    } catch (error) {
      next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
      const log = await get(req.params.id);
      res.json({ log: log });
    } catch (error) {
      next(error);
    }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
    
    const data = req.body;
  
    let errors = {};
  
    if (!isValidDate(data.date)) {
      errors.date = 'Invalid date.';
    }
  
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: 'Adding the log failed due to validation errors.',
        errors,
      });
    }

    console.log(data);
  
    try {
      await add(data);
      res.status(201).json({ message: 'log saved.', event: data });
    } catch (error) {
      next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    const data = req.body;
  
    let errors = {};
  
    if (!isValidDate(data.date)) {
      errors.date = 'Invalid date.';
    }
  
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: 'Updating the log failed due to validation errors.',
        errors,
      });
    }
  
    try {
      await replace(req.params.id, data);
      res.json({ message: 'Log updated.', event: data });
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res, next) => {
    try {
      await remove(req.params.id);
      res.json({ message: 'Log deleted.' });
    } catch (error) {
      next(error);
    }
});

module.exports = router;
