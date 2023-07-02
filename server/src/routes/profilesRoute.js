const express = require('express');
const mongoose = require('mongoose');
const ProfileModel = require('../models/Profiles.js');

const profileRouter = express.Router();

//GOOD
//Get profile of current user
profileRouter.get('/:email', async (req, res) => {
    try {
        const response = await ProfileModel.findOne({email: req.params.email});
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Get list of name of members
profileRouter.get('/names/:emails', async (req, res) => {
    try {
        const emailList = req.params.emails.split(',');
        const userNamePromises = emailList.map((userEmail) => ProfileModel.findOne({email: userEmail}).select('name'));
        const userNameList = await Promise.all(userNamePromises);
        const response = userNameList.map((profile) => profile.name);
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Get other profiles
profileRouter.get('/other/:profileId', async (req, res) => {
    try {
        const response = await ProfileModel.findById(req.params.profileId);
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
//Get search results based on profile's email, name, degree, currentModules, academicGoals, personalInterest
profileRouter.get('/results/:queryId', async (req, res) => {
    try {
        const responseForEmailQuery = await ProfileModel.find({email: { $regex: '\\b' + req.params.queryId + '\\b', $options: 'i' }});
        const responseForNameQuery = await ProfileModel.find({name: { $regex: '\\b' + req.params.queryId + '\\b', $options: 'i' }});
        const responseForDegreeQuery = await ProfileModel.find({degree:{ $in: [req.params.queryId] }});
        const responseForModulesQuery = await ProfileModel.find({currentModules:{ $in: [req.params.queryId] }});
        const responseForAcademicQuery = await ProfileModel.find({academicGoals: { $regex: '\\b' + [req.params.queryId] + '\\b', $options: 'i' }});
        const responseForInterestQuery = await ProfileModel.find({personalInterest:{ $in: [req.params.queryId] }});

        let response = [];

        if (responseForEmailQuery) {
            response = response.concat(responseForEmailQuery);
        };

        if (responseForNameQuery) {
            response = response.concat(responseForNameQuery);
        };

        if (responseForDegreeQuery) {
            response = response.concat(responseForDegreeQuery);
        };

        if (responseForModulesQuery) {
            response = response.concat(responseForModulesQuery);
        };

        if (responseForAcademicQuery) {
            response = response.concat(responseForAcademicQuery);
        };

        if (responseForInterestQuery) {
            response = response.concat(responseForInterestQuery);
        };

        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//GOOD
profileRouter.post('/', async (req, res) => {
    try {
        let updatedModules = [ ...req.body.currentModules ];
        updatedModules = updatedModules.map((module) => module.toUpperCase());
        const updatedProfile = { ...req.body, currentModules: updatedModules };
        const profile = new ProfileModel(updatedProfile);
        const response = await profile.save();
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GOOD
profileRouter.put('/:email', async (req, res) => {
    try {
        let updatedModules = [ ...req.body.currentModules ];
        updatedModules = updatedModules.map((module) => module.toUpperCase());
        const updatedProfile = { ...req.body, currentModules: updatedModules };
        const response = await ProfileModel.findOneAndUpdate({email: req.params.email}, updatedProfile, { new: true });
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = profileRouter;
