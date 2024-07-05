const express = require('express');
const { createSetting, getUserSetting, updateUserSetting } = require('../controllers/SettingController');

const router = express.Router();

// Ruta para crear configuración
router.post('/create', createSetting);
router.post('/get', getUserSetting);
router.post('/update', updateUserSetting);

module.exports = router;