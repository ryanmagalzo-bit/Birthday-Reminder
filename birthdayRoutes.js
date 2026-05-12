const express = require('express');
  const router = express.Router();
  const birthdayController = require('../controllers/birthdayController');
  const authMiddleware = require('../middleware/authMiddleware');
  
  router.use(authMiddleware);
  router.get('/', birthdayController.getBirthdays);
  router.post('/', birthdayController.createBirthday);
  router.put('/:id', birthdayController.updateBirthday);
  router.delete('/:id', birthdayController.deleteBirthday);
  
  module.exports = router;