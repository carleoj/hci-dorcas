const express = require('express');
const { getUsers, loginUser, signupStudent  } = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);
router.post('/login', loginUser);
router.post('/signup', signupStudent);  

module.exports = router;
