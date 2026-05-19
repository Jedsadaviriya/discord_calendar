const mongoose = require('mongoose')
const eventSchema = mongoose.Schema({
    title: String,
    startTime: Date,
    endTime: Date,
    type: {type: String, enum: ['work', 'personal', 'family'], required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now}
});
const Event = mongoose.model('Event', eventSchema);
module.exports=Event;