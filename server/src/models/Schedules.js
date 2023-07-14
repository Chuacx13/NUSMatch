const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    events: [{ 
        title: { type: String, required: true},
        start: { type: Date, required: true},
        end: { type: Date, required: true},
        description: { type: String, required: true},
    }]
});

const ScheduleModel = mongoose.model('schedules', ScheduleSchema);

module.exports = ScheduleModel;