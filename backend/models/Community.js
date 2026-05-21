const mongoose = require('mongoose')
const communitySchema=new mongoose.Schema({
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}

});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;