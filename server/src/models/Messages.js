const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.ObjectId, ref: 'groups', required: true },
    content: { type: String, required: true },
    creatorEmail: { type: String, ref: 'users', required: true },
    creatorName: { type: String, ref: 'users', required: true },
    time: { type: String, required: true }
});

const MessageModel = mongoose.model('messages', MessageSchema);

module.exports = MessageModel;