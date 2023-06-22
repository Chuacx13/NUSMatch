const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true, unique: true },
    groupStatus: { type: String, required: true },
    groupDescription: { type: String, required: true },
    leader: { type: String, required: true },
    modules: [{ type: String, required: true }],
    members: [{ type: String, ref: 'users', required: true }]
});

const GroupModel = mongoose.model('groups', GroupSchema);

module.exports = GroupModel;