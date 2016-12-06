/**
 * Created by Admin on 12/5/2016.
 */
// app/routes.js

// require path for use in angular routes
var path = require('path');

// grab the User model we just created
var User = require('./models/user');

module.exports = function(app){

    // server routes =============================================
    // handle things like api calls
    // authentication routes

    // test api route
    app.get('/api/test', function(req, res){
        res.json({message: 'This is just a test'});
    });

    //Returns all users as a json
    app.get('/api/users', function(req, res){

        //use mongoose to get all users in the database
        User.find({}, function(err,users){
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if(err)
                res.send(err);

            res.json(users)
        });

    });

    //Returns an array of usernames
    app.get('/api/usernames',function(req,res){
        User.aggregate([
            {
                "$group":{
                    "_id":null,
                    "username":{
                        "$push":"$username"
                    }
                }
            },
            {
                "$project":{
                    "_id":0, "username":1
                }
            }
        ],function(err, results){
            if(err)
                res.send(err);

            //Array to return
            var usernameArr = [];

            //Push each username to the array
            for(i=0; i< results[0].username.length; i++)
                usernameArr.push(results[0].username[i])

            //Return the array
            res.json(usernameArr);
        })
    });

    //Returns the games played by a user as a String array.
    app.get('/api/games/:username',function(req, res){
        User.findOne({"username":req.params.username}, function(err,user){

            if(err)
                res.send(err);

            var gamesLength = user.games.length;
            var gameArr = [];
            var playersLength;
            var players= "";
            for(i = 0; i< gamesLength; i++){
                playersLength = user.games[i].players.length;
                for(j = 0; j < playersLength; j++)
                    players += " " + user.games[i].players[j].username;
                gameArr[i] = "Game #" + i + " Players" + players  + " Winner: " + user.games[i].winner + " Score: " + user.games[i].score;
                players = "";
            }

            res.json(gameArr);

        })

    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes ===========================================
    // route to handle all angular requests
    app.get('*', function(req,res){

        //Load our public/index.html
        res.sendFile(path.join(__dirname, '../public/views/index.html'))
    });

};