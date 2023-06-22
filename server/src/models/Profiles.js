const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    degree: [{ type: String, required: true }],
    currentModules: [{ type: String, required: true }],
    academicGoals: { type: String, required: true },
    status: { type: String, required: true },
    personalInterest: [{ type: String, required: true }]
});

const ProfileModel = mongoose.model('profiles', ProfileSchema);

module.exports = ProfileModel;