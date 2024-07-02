const express = require('express');
const { createUser, getUser, loginUser, getUserByToken, updateUser } = require('../controllers/UserController');

const router = express.Router();

// Ruta para crear usuario
router.post('/create', createUser);
router.post('/get', getUser);
router.post('/login', loginUser);
router.post('/getUserByToken', getUserByToken);
router.post('/update', updateUser);

module.exports = router;