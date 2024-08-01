const express = require('express');
const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/ExpenseController');

const router = express.Router();
router.post('/create', createExpense);
router.post('/get', getExpenses);
router.post('/update', updateExpense);
router.post('/delete', deleteExpense);

module.exports = router;
