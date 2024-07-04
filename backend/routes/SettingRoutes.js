const express = require('express');
const { createSetting } = require('../controllers/SettingController');

const router = express.Router();

// Ruta para crear configuración
router.post('/create', createSetting);

module.exports = router;