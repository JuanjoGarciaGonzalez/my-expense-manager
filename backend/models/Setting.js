const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    currency: { type: String, required: true },
    language: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;