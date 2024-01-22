// Test DB again

const { MongoClient } = require('mongodb');

let dbConnection;

// exporting DB functions

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/activities')
        .then((client) => { 
            dbConnection = client.db()
            return cb()
         })
         .catch(err => {
            console.log(err)
            return cb(err)
         })
    },
    getDb: () => dbConnection
}