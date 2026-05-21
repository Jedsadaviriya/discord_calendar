const mongoose=require('mongoose');
const workScheduleSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    daysOfWeek: [Number],
    startTime: String,
    endTime: String,
    timezone: String,
    createdAt: {type:Date, default:Date.now}
});
const WorkSchedule = mongoose.model('WorkSchedule', workScheduleSchema);
module.exports=WorkSchedule;