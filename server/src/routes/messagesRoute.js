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

const fetchUserGroups = async() => {
    try {
      const groupList = await axios.get(`${apiUrl}/group/${userEmail}`);
      const groups = encodeURIComponent(JSON.stringify(groupList.data));
      const response = await axios.get(`${apiUrl}/message/mostrecent?groupList=${groups}`)
      setAllGroups(response.data);
    } catch (err) {
      console.error(err);
    } 
}; 

module.exports = messageRouter;