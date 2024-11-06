const express = require('express');
const router = express.Router();
const { authValidation } = require('../middleware/validation');
const authorization = require('../middleware/auth');

const authController = require('../controllers/userControllers');

router.get('/',authorization, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  res.send({status: true, token: token});
});

router.post('/signup', authValidation, authController.createUser );

router.post('/signin', authValidation, authController.signInUser );

module.exports = router;