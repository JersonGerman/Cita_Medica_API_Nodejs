const express = require('express');
const router = express.Router();

// Controllers
const { getAllUsers, createUser, login } = require('../controllers/users.controller');


router.get('/', getAllUsers)

router.post('/', createUser);

router.post('/login', login);

module.exports = { usersRouter: router }