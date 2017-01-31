/**
 * Created by Admin on 12/5/2016.
 */
// app/routes.js

// require path for use in angular routes
var path = require('path');

// grab the User model we just created
var User = require('./models/user');
var mongoose = require('mongoose');
var sha256 = require('../node_modules/js-sha256/src/sha256');
module.exports = function (app) {

    // server routes =============================================
    // handle things like api calls
    // authentication routes

    // test api route
    app.get('/api/test', function (req, res) {
        res.json({message: 'This is just a test'});
    });

    app.get('/api/user/:username', function (req, res) {
        User.findOne({"username": req.params.username}, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        })
    });

    //Returns all users as a json
    app.get('/api/users', function (req, res) {

        //use mongoose to get all users in the database
        User.find({}, function (err, users) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users)
        });

    });

    //Returns an array of usernames
    app.get('/api/usernames', function (req, res) {
        User.aggregate([
            {
                "$group": {
                    "_id": null,
                    "username": {
                        "$push": "$username"
                    }
                }
            },
            {
                "$project": {
                    "_id": 0, "username": 1
                }
            }
        ], function (err, results) {
            if (err)
                res.send(err);

            //Array to return
            var usernameArr = [];

            //Push each username to the array
            for (i = 0; i < results[0].username.length; i++)
                usernameArr.push(results[0].username[i])

            //Return the array
            res.json(usernameArr);
        })
    });

    //Get all game records
    app.get('/api/games/all', function (req, res) {

        User.aggregate([


            {$match: {"games": {"$ne": null}}},
            {$project: {"games": 1, "_id": 0}},
            {$unwind: "$games"},
            {$project: {game: "$games"}}

        ], function (err, result) {

            if (err)
                res.send(err);

            res.json(result);

        })

    });

    //Get a copy of all the games played.
    app.get('/api/games/unique', function (req, res) {

        User.aggregate([


            {$match: {"games": {"$ne": null}}},
            {$project: {"games": 1, "_id": 0}},
            {$unwind: "$games"},
            {$project: {game: "$games"}},
            {$group: {_id: "games", "games": {$addToSet: "$game"}}}

        ], function (err, result) {

            if (err)
                res.send(err);

            res.json(result);

        })

    });

    //Returns the games played by a user.
    app.get('/api/games/:username', function (req, res) {
        User.aggregate([


            {$match: {"username": {"$eq": req.params.username}}},
            {$project: {"games": 1, "_id": 0}},
            {$unwind: "$games"},
            {$project: {game: "$games"}},
            {$group: {_id: "games", "games": {$addToSet: "$game"}}},
            {$unwind: "$games"}

        ], function (err, result) {
            if (err)
                res.send(err);

            res.json(result);
        })
    });

    //Returns the user's friend list.
    app.get('/api/friends/get/:username', function (req, res) {
        User.aggregate([
            {$match: {"username": {"$eq": req.params.username}}},
            {$project: {"friends": 1, "_id": 0}}
        ], function (err, result) {
            if (err)
                res.send(err);

            res.send(result);
        })
    });

// routes to handle updates go here (app.put)

// route to handle creating goes here (app.post)
    app.post('/api/register', function (req, res) {

        var userSchema = mongoose.model('User', User.userSchema);

        var newUser = new userSchema();

        newUser.username = req.body.username;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.password = sha256(req.body.password);

        newUser.save(function (err, doc) {
            if (err)
                res.send(err);
            else
                res.send(doc);
        })

    });

// route to handle adding a friend (app.post)
    app.post('/api/friends/post/:username/:friendUsername', function (req, res) {
        var newFriendUserName = req.params.friendUsername;
        var userName = req.params.username;
        try {
            //Retrieves the list of friends for the user
            User.aggregate([
                {$match: {"username": {"$eq": req.params.username}}},
                {$project: {"friends": 1, "_id": 0}}
            ], function (err, result) {
                if (err)
                    res.send(err);

                //Adds the friendUsername to the returned list of friends
                var curFriendsList = result[0].friends;
                if (!curFriendsList)
                    curFriendsList = [];
                curFriendsList.push(newFriendUserName);

                //Updates the user's friend array with the new friend array.
                User.update({username: {$eq: userName}}, {$set: {friends: curFriendsList}}, {upsert: true}).exec();
                res.json({"status": "success"})

            });
        } catch (e) {
            res.json({"status": "failure"})
        }

    });

    // route to handle removing a friend (app.post)
    app.post('/api/friends/remove/:username/:friendUsername', function (req, res) {
        var friendToRemove = req.params.friendUsername;
        var userName = req.params.username;

        //Retrieves the list of friends for the user
        User.aggregate([
            {$match: {"username": {"$eq": req.params.username}}},
            {$project: {"friends": 1, "_id": 0}}
        ], function (err, result) {
            if (err)
                res.send(err);

            //Removes the friendUsername to the returned list of friends
            var curFriendsList = result[0].friends;
            if (curFriendsList) {
                var index = curFriendsList.indexOf(friendToRemove);
                curFriendsList.splice(index, 1);
            }

            //Updates the user's friend array with the new friend array.
            User.update({username: {$eq: userName}}, {$set: {friends: curFriendsList}}).exec();

        });

        res.json({"status": "success"})

    });

    app.post('/api/login',function(req,res){
        var phash = sha256(req.body.password);
        var username = req.body.username;

        User.findOne({"username": username}, function (err, user) {
            if (err)
                res.send(err);
            if(user && user.password === phash)
                res.send("success");
            else
                res.send("failed");
        })

    });

// route to handle delete goes here (app.delete)
    app.delete('/api/delete/:username', function (req, res) {
        User.remove({'username': req.params.username}, function (err, doc) {
            if (err)
                res.send(err);
            res.send(doc)
        });
    });

// frontend routes ===========================================
// route to handle all angular requests
    app.get('*', function (req, res) {

        //Load our public/index.html
        res.sendFile(path.join(__dirname, '../public/views/index.html'))
    });

}
;