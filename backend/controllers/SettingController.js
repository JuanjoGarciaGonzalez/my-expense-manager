const Setting = require('../models/Setting');

exports.createSetting = async (req, res) => {
    try {
        const { currency, language, user } = req.body;

        // Validar campos requeridos
        if (!currency || !language || !user) {
            return res.status(404).json({status: 500,  message: 'Todos los campos requeridos deben ser proporcionados.' });
        }

        // Crear y guardar nueva configuración
        const newSetting = new Setting({
            currency,
            language,
            user
        });

        await newSetting.save();

        res.status(201).json(newSetting);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred creating setting.' });
    }
}

exports.getUserSetting = async (req, res) => {
    try {
        const setting = await Setting.findOne({ user: req.body.user });
        if (!setting) {
            return res.status(500).json({ status: 500, message: 'Setting not found.' });
        }
        res.status(200).json({status: 200, setting});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred getting setting.' });
    }
}

exports.updateUserSetting = async (req, res) => {
    try {
        const setting = await Setting.findOne({ user: req.body.user });
        if (!setting) {
            return res.status(500).json({ status: 500, message: 'Setting not found.' });
        }
        setting.currency = req.body.currency;
        setting.language = req.body.language;
        await setting.save();
        res.status(200).json({status: 200, setting});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred updating setting.' });
    }
}