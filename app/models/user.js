// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our Player Model
var playerSchema = new mongoose.Schema({
    username: String,
    army: String
});

// define our Game Model
var gameSchema = new mongoose.Schema({
    winner: String,
    score: String,
    players:[playerSchema]
});

// define our User Model
var userSchema = new mongoose.Schema({
    firstName: {type: String, default: ' '},
    lastName: {type: String, default: ' '},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    games:[gameSchema],
    friends:[{type: String}]

});

// define our User model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);