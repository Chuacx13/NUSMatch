const express = require('express');
const mongoose = require('mongoose');
const ProfileModel = require('../models/Profiles.js');

const profileRouter = express.Router();

//Get profile of current user
profileRouter.get('/:email', async (req, res) => {
    try {
        const response = await ProfileModel.findOne({email: req.params.email});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//Get name of members
profileRouter.get('/names/:email', async (req, res) => {
    try {
        const response = await ProfileModel.findOne({email: req.params.email});
        res.json(response.name);
    } catch (err) {
        res.json(err);
    }
});

//Get other profiles
profileRouter.get('/other/:profileId', async (req, res) => {
    try {
        const response = await ProfileModel.findById(req.params.profileId);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//Get search results based on profile's email, name, degree, currentModules, academicGoals, personalInterest
profileRouter.get('/results/:queryId', async (req, res) => {
    try {
        const responseForEmailQuery = await ProfileModel.find({email: req.params.queryId});
        const responseForNameQuery = await ProfileModel.find({ name: { $regex: '\\b' + req.params.queryId + '\\b', $options: 'i' }});
        const responseForDegreeQuery = await ProfileModel.find({degree:{ $in: [req.params.queryId] }});
        const responseForModulesQuery = await ProfileModel.find({currentModules:{ $in: [req.params.queryId] }});
        const responseForAcademicQuery = await ProfileModel.find({academicGoals: req.params.queryId});
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

profileRouter.post('/edit', async (req, res) => {
    const profile = new ProfileModel(req.body);
    try {
        const response = await profile.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

profileRouter.put('/edit/:email', async (req, res) => {
    try {
        const response = await ProfileModel.findOneAndUpdate({email: req.params.email}, req.body, { new: true });
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

module.exports = profileRouter;
