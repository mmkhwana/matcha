const mongoClient = require("mongodb").MongoClient;
const objectID = require('mongodb').objectID;
const dbname = "Lovers";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true};


const state = {
    db = null
};

const connect = (cb) =>{
    if (state.db)
        cb();
    else{
        MongoClient.connect(url, mongoOptions,(err,client) => {
            if (err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
        }
    });
}
}

const getPrimaryKey = (_id)=>{
    return objectID(_id);
}

const getDb = ()=>{
    return state.db;
}

module.exports = {getDb,connect,getPrimaryKey}; 