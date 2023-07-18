const express = require('express');
const GroupModel = require('../models/Groups.js');
const ProfileModel = require('../models/Profiles.js');
const ScheduleModel = require('../models/Schedules.js');
const MessageModel = require('../models/Messages.js');

const groupRouter = express.Router();

//GOOD
//Get groups of current user
groupRouter.get('/:email', async (req, res) => {
    try {
        const response = await GroupModel.find({members:{ $in: [req.params.email] }});
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Get group details
groupRouter.get('/other/:groupId', async (req, res) => {
    try {
        const response = await GroupModel.findById(req.params.groupId);
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Get group details for edits
//Leader of group removed from list of members
groupRouter.get('/edits/:groupId', async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.groupId);
        const updatedMembers = group.members.filter((member) => member !== group.leader)
        group.members = updatedMembers;
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Get search results based on group's name, description and modules
groupRouter.get('/results/:queryId', async (req, res) => {
    try {
        const responseForNameQuery = await GroupModel.find({groupName: { $regex: '\\b' + req.params.queryId + '\\b', $options: 'i' }});
        const responseForDescriptionQuery = await GroupModel.find({ groupDescription: { $regex: '\\b' + req.params.queryId + '\\b', $options: 'i' }});
        const responseForModulesQuery = await GroupModel.find({modules:{ $in: [req.params.queryId] }});

        let response = [];

        if (responseForNameQuery) {
            response = response.concat(responseForNameQuery);
        };

        if (responseForDescriptionQuery) {
            response = response.concat(responseForDescriptionQuery);
        };

        if (responseForModulesQuery) {
            response = response.concat(responseForModulesQuery);
        };

        const updatedResponse = [];
        const uniqueIds = [];
        for (const group of response) {
            const stringId = group._id.toString();
            if (uniqueIds.includes(stringId)) {
                continue;
            } else {
                updatedResponse.push(group);
                uniqueIds.push(stringId);
            }
        }

        res.json(updatedResponse);
    } catch (err) {
        res.json(err);
    }
});

//GOOD
//Get group's requests
groupRouter.get('/requests/:groupId', async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.groupId);
        const requests = group.userRequests;
        const profilePromises = requests.map((email) => ProfileModel.findOne({ email: email }));
        const profiles = await Promise.all(profilePromises);
        res.json(profiles); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//User create group
groupRouter.post('/', async (req, res) => {
    try {
        const { groupData, userEmail } = req.body;

        //Check if members' account are set to public
        const updatedMembers = [...groupData.members];
        for (const email of updatedMembers) {
            const profile = await ProfileModel.findOne({ email: email });
            if (profile.status === 'Snooze') {
                res.json({ message: 'Members may not wish to be added'});
                return;
            }
        };

        //Add self into list of members
        updatedMembers.push(userEmail);

        //Capitalise all modules added
        let updatedModules = [...groupData.modules];
        updatedModules = updatedModules.map((module) => module.toUpperCase());

        //Final group to be saved
        const finalGroup = { ...groupData, members: updatedMembers, modules: updatedModules };
        const group = new GroupModel(finalGroup);

        //Check for duplicate members
        const uniqueMembers = new Set();
        for (const member of group.members) {
            if (uniqueMembers.has(member)) {
                res.json({ message: 'There is a duplicate member' });
                return;
            }
            uniqueMembers.add(member);
        };
    
        const response = await group.save();

        res.json(response);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//User edit group
groupRouter.put('/:groupId', async (req, res) => {
    try {
        const { groupData, userEmail } = req.body;

        const group = await GroupModel.findOne({ _id: req.params.groupId });
        const currentMembers = [ ...group.members];
        const updatedMembers = [...groupData.members];
        const newMembers = [];
        for (let i = 0; i < updatedMembers.length; i++) {
            if (currentMembers.includes(updatedMembers[i])) {
                continue;
            } else {
                newMembers.push(updatedMembers[i]);
            }
        }

        //Check if members' account are set to public
        if (newMembers) {
            for (const email of newMembers) {
                const profile = await ProfileModel.findOne({ email: email });
                if (profile.status === 'Snooze') {
                    res.json({ message: 'Members may not wish to be added', name: profile.name });
                    return;
                }
            }
        }

        //Add self into list of members
        updatedMembers.push(userEmail);

        //Capitalise all modules added
        let updatedModules = [...groupData.modules];
        updatedModules = updatedModules.map((module) => module.toUpperCase());

        //Final group to be saved
        const finalGroup = { ...groupData, members: updatedMembers, modules: updatedModules };

        //Check for duplicate members 
        const uniqueMembers = new Set();
        for (const member of finalGroup.members) {
            if (uniqueMembers.has(member)) {
                res.json({ message: 'There is a duplicate member' });
                return;
            }
            uniqueMembers.add(member);
        };

        const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, finalGroup, { new: true });
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Member leaves group
groupRouter.put('/leave/:groupId', async (req, res) => {
    try {
        const { groupData, userEmail } = req.body;

        //Removes self from the list of members
        const updatedMembers = [ ...groupData.members];
        const index = updatedMembers.indexOf(userEmail);
        if (index !== -1) {
            updatedMembers.splice(index, 1);
        }

        //Reassign leader
        //If no leader can be reassigned, delete group from Groups database
        const updatedLeader = updatedMembers[0];
        if (updatedLeader === null || updatedLeader === undefined) {

            await GroupModel.findOneAndDelete({ _id: req.params.groupId });
            await ScheduleModel.findOneAndDelete({ groupId: req.params.groupId });
            await MessageModel.deleteMany({ groupId: req.params.groupId });
            res.json({ message: 'Group deleted successfully' });

        } else {

            //Final group to be saved
            const finalGroup = { ...groupData, leader: updatedLeader, members: updatedMembers };

            const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, finalGroup, { new: true });
            res.json(response);

        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Join the group
groupRouter.put('/join/:groupId', async (req, res) => {
    try {
        const { groupData, userEmail } = req.body;

        //Add self into list of members
        const updatedMembers = [...groupData.members];
        updatedMembers.push(userEmail);

        //Final group to be saved
        const finalGroup = { ...groupData, members: updatedMembers };

        const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, finalGroup, { new: true });
        res.json(response);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Send request to the group
groupRouter.put('/request/:groupId', async (req, res) => {
    try {
        const { groupData, userEmail } = req.body;

        //Update requests
        const updatedRequests = [ ...groupData.userRequests]; 
        updatedRequests.push(userEmail);

        //Final group to be saved
        const finalGroup = { ...groupData, userRequests: updatedRequests };

        const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, finalGroup, { new: true });
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Accept request to the group
groupRouter.put('/accept/:groupId', async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const email = req.body.email;

        const updatedGroup = await GroupModel.findByIdAndUpdate(groupId, 
            { $push: { members: email }, $pull: { userRequests: email } }, 
            { new: true });

        res.json(updatedGroup);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//GOOD
//Reject request to the group
groupRouter.put('/reject/:groupId', async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const email = req.body.email;

        const updatedGroup = await GroupModel.findByIdAndUpdate(groupId, 
            { $pull: { userRequests: email } }, 
            { new: true });

        res.json(updatedGroup);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = groupRouter;