const express = require('express');
const mongoose = require('mongoose');
const GroupModel = require('../models/Groups.js');

const groupRouter = express.Router();

//Get groups of current user
groupRouter.get('/:email', async (req, res) => {
    try {
        const response = await GroupModel.find({members:{ $in: [req.params.email] }});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//Get group details
groupRouter.get('/other/:groupId', async (req, res) => {
    try {
        const response = await GroupModel.findById(req.params.groupId);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

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

groupRouter.post('/create', async (req, res) => {
    const group = new GroupModel(req.body);
    try {
        //Check for duplicate members 
        for (const firstCompareIndex in group.members) {
            for (const secondCompareIndex in group.members) {
                if (firstCompareIndex === secondCompareIndex) {
                    continue;
                } else if (group.members[firstCompareIndex] === group.members[secondCompareIndex]) {
                    res.json({ message: 'There is a duplicate member'});
                    return;
                } 
            }
        };
        const response = await group.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

groupRouter.put('/edit/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const group = await GroupModel.findById(groupId);
    try {
        //Check for duplicate members 
        for (const firstCompareIndex in group.members) {
            for (const secondCompareIndex in group.members) {
                if (firstCompareIndex === secondCompareIndex) {
                    continue;
                } else if (group.members[firstCompareIndex] === group.members[secondCompareIndex]) {
                    res.json({ message: 'There is a duplicate member'});
                    return;
                } 
            }
        };
        const response = await GroupModel.findOneAndUpdate({_id: req.params.groupId}, req.body, { new: true });
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

module.exports = groupRouter;