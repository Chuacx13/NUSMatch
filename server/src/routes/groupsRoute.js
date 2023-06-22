const express = require('express');
const mongoose = require('mongoose');
const GroupModel = require('../models/Groups.js');

const groupRouter = express.Router();

groupRouter.get('/', async (req, res) => {
    try {
        const response = await GroupModel.findOne({email: req.params.email});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

groupRouter.post('/create', async (req, res) => {
    const group = new GroupModel(req.body);
    try {
        const response = await group.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

module.exports = groupRouter;