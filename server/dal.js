const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb+srv://Ranjitha:Ranjitha@cluster0.hkorj.mongodb.net/myproject?retryWrites=true&w=majority"
//const uri = process.env.MONGODB_URI;
const url         = 'mongodb://localhost:27017/myFirstDatabase';
let db            = null;
 
// connect to mongo
MongoClient.connect(MONGODB_URI, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");
    // connect to myproject database
    db = client.db('myFirstDatabase');
});

// create user account
function create(name, email, password,role){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, role};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}
// login
function login(email, password){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email},{password: password})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all, login};