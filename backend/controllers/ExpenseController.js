const User = require('../models/User');

exports.createExpense = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const expense = new Expense(req.body);
        expense.user = user;
        await expense.save();
        res.status(201).json(expense);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred creating expense.' });
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const expenses = await Expense.find({ user: user });
        res.status(200).json(expenses);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred getting expenses.' });
    }
}

exports.getExpense = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ status: 404, message: 'Expense not found.' });
        }
        res.status(200).json(expense);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred getting expense.' });
    }
}

exports.updateExpense = async (req, res) => {  
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ status: 404, message: 'Expense not found.' });
        }
        Object.assign(expense, req.body);
        await expense.save();
        res.status(200).json(expense);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred updating expense.' });
    }
}