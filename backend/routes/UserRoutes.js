const express = require('express');
const { createUser, getUser, loginUser } = require('../controllers/UserController');

const router = express.Router();

// Ruta para crear usuario
router.post('/create', createUser);
router.post('/get', getUser);
router.post('/login', loginUser);

module.exports = router;