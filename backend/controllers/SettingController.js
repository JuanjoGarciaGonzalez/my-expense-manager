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