const express = require('express');
const router = express.Router();
const { authValidation } = require('../middleware/validation');

const authController = require('../controllers/userControllers');

router.post('/signup', authValidation, authController.createUser );

router.post('/signin', authValidation, authController.signInUser );

router.get('/users',  (req, res) => {
  res.status(200).json({ users: "hello" });
});

module.exports = router;