const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Interest = new Schema ({
    title: String,
    imageUrl: String,
    isOwner: Boolean,
    isLikedBy: [String]
});
const User = new Schema({
    twitterId: String,
    username: String,
    displayName: String,
    imageUrl: String,
    interests: [Interest]
});

module.exports = mongoose.model('User', User);
