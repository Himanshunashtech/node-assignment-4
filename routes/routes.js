
const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/register', (req, res) => {
  res.sendFile('views/register.html', { root: __dirname + '/../' });
});

router.post('/register', userController.register);

router.get('/login', (req, res) => {
  res.sendFile('views/login.html', { root: __dirname + '/../' });
});

router.post('/login', userController.login);

module.exports = router;