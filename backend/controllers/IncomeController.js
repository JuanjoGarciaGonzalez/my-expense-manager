const User = require('../models/User');

exports.createIncome = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const income = new Income(req.body);
        income.user = user;
        await income.save();
        res.status(201).json(income);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred creating income.' });
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const incomes = await Income.find({ user: user });
        res.status(200).json(incomes);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred getting incomes.' });
    }
}

exports.getIncome = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const income = await Income.findById(req.params.id);
        if (!income) {
            return res.status(404).json({ status: 404, message: 'Income not found.' });
        }
        res.status(200).json(income);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred getting income.' });
    }
}

exports.updateIncome = async (req, res) => {  
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const income = await Income.findById(req.params.id);
        if (!income) {
            return res.status(404).json({ status: 404, message: 'Income not found.' });
        }
        income.title = req.body.title;
        income.amount = req.body.amount;
        income.date = req.body.date;
        income.description = req.body.description;
        income.type = req.body.type;
        income.category = req.body.category;
        income.user = user;
        await income.save();
        res.status(200).json(income);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred updating income.' });
    }
}