const express = require('express');
const { createIncome, getIncomes, updateIncome, deleteIncome } = require('../controllers/IncomeController');

const router = express.Router();
router.post('/create', createIncome);
router.post('/get', getIncomes);
router.post('/update', updateIncome);
router.post('/delete', deleteIncome);

module.exports = router;