const express = require('express');
const ScheduleModel = require('../models/Schedules.js');

const scheduleRouter = express.Router();

//GOOD
//Get group's schedule
scheduleRouter.get('/:groupId', async (req, res) => {
    try {
        const response = await ScheduleModel.findOne({ groupId: req.params.groupId });
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//GOOD
//Add an event to schedule
scheduleRouter.put('/addevent/:scheduleId', async (req, res) => {
    try {
        const response = await ScheduleModel.findByIdAndUpdate(
            req.params.scheduleId, 
            { $push: { events: req.body } }, 
            { new: true });
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//GOOD
//Delete an event from schedule
scheduleRouter.put('/deleteevent/:scheduleId', async (req, res) => {
    try {
        const response = await ScheduleModel.findByIdAndUpdate(
            req.params.scheduleId, 
            { $pull: { events: req.body } }, 
            { new: true });
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//GOOD
//Create a schedule (only happens when a group is successfully created)
scheduleRouter.post('/:groupId', async (req, res) => {
    try {
        const schedule = new ScheduleModel({ groupId: req.params.groupId,  events: [] });
        const response = await schedule.save();
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = scheduleRouter;