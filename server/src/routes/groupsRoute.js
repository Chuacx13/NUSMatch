const express = require('express');
const mongoose = require('mongoose');
const GroupModel = require('../models/Groups.js');

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

        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//GOOD
groupRouter.post('/', async (req, res) => {
    try {
        const { groupData, userEmail } = req.body;
        //Add self into list of users
        const updatedMembers = [...groupData.members];
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

        //Add self into list of members
        const updatedMembers = [...groupData.members];
        updatedMembers.push(userEmail);

        //Capitalise all modules added
        let updatedModules = [...groupData.modules];
        updatedModules = updatedModules.map((module) => module.toUpperCase());

        //Final group to be saved
        const group = { ...groupData, members: updatedMembers, modules: updatedModules };

        //Check for duplicate members 
        const uniqueMembers = new Set();
        for (const member of group.members) {
            if (uniqueMembers.has(member)) {
                res.json({ message: 'There is a duplicate member' });
                return;
            }
            uniqueMembers.add(member);
        };

        const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, group, { new: true });
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
            res.json({ message: 'Group deleted successfully' });

        } else {

            //Final group to be saved
            const group = { ...groupData, leader: updatedLeader, members: updatedMembers };

            const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, group, { new: true });
            res.json(response);

        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

groupRouter.put('/join/:groupId', async (req, res) => {
    try {
        const { groupData, userEmail } = req.body;

        //Add self into list of members
        const updatedMembers = [...groupData.members];
        updatedMembers.push(userEmail);

        //Final group to be saved
        const group = { ...groupData, members: updatedMembers };

        const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, group, { new: true });
        res.json(response);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = groupRouter;