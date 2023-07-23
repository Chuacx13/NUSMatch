const express = require('express');
const MessageModel = require('../models/Messages.js');
const ProfileModel = require('../models/Profiles.js');

const messageRouter = express.Router();

//GOOD
//Get most recent message of group
messageRouter.get('/mostrecent', async (req, res) => {
    try {
        const groupList = JSON.parse(decodeURIComponent(req.query.groupList));
        for (const group of groupList) {
            const recentMessage = await MessageModel.findOne({ groupId: group._id }).sort({ _id: -1 });
            if (recentMessage) {
                const profile = await ProfileModel.findOne({ email: recentMessage.creator });
                const name = profile.name;
                recentMessage.creator = name;
                group.recentMessage = recentMessage;
            }
        }
        res.json(groupList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
