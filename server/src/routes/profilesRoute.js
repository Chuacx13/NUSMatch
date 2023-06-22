const express = require('express');
const mongoose = require('mongoose');
const ProfileModel = require('../models/Profiles.js');

const profileRouter = express.Router();

profileRouter.get('/:email', async (req, res) => {
    try {
        const response = await ProfileModel.findOne({email: req.params.email});
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
