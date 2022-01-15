var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const admin   = require('./admin');
const mongoose = require('mongoose');

var PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';


const path = require('path');

// used to serve static files from public directory
app.use(cors());
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.resolve(__dirname, "./client/public")));
    app.get("*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
      });
    
}



app.get('/auth', function(req,res){
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);

    // verify token
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            res.send('Authentication Sucess!');
        }).catch(function(error) {
            console.log('error:', error);
            res.send('Authentication Fail!');
        });
})


async function verifyToken(req,res,next){
    const idToken = req.headers.authorization;
    console.log('idToken:', idToken);

    if(idToken){
        admin.auth().verifyIdToken(idToken)
            .then(function(decodedToken) {
                console.log('DecodedToken:',decodedToken);
                console.log('Decoded token success!');
                return next();
            }).catch(function(error) {
                console.log('Decoded token fail!');
                return res.status(401).send('You are not authorized');
            });
    }
    else{
        console.log('Token not found!');
        return res.status(401).send('You are not authorized');        
    }
}

// create user account
app.get('/account/create/:name/:email/:password/:role', function (req, res) {
        
    // check if account exists
    dal.find(req.params.email).
        then((users) => {
            console.log("users:",users);
            // if user exists, return error message
            if(users.length > 0){
                console.log('User already exists');
                res.send('User already exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password,req.params.role).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});

// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);                   
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/email/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount).
        then((response) => {
            console.log("Hello",response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});


app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});