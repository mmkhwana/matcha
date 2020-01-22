const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//User

router.get('/', async(req, res) => {
    const posts = await loadUsersCollection();
    res.send(await posts.find({}).toArray());
});

router.post('/', async(req, res) => {
    const posts = await loadUsersCollection();
    if (req.body.confirm == req.body.pass)
    {
        var password = req.body.pass;
        await posts.insertOne({
            name: req.body.username,
            email: req.body.email,
            birth: req.body.date,
            pass: password
    });
    res.status(200).send("User Registered");
    }
});

router.delete('/:id', async(req, res) => {
    const posts = await loadUsersCollection();
    await posts.deleteOne ({_id: new mongodb.ObjectID(req.params.id)}); 
    res.status(200).send();
});

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://pntsunts:19930813@cluster0-fkexu.mongodb.net/test?retryWrites=true&w=majority', {
        keepAlive: 1, useUnifiedTopology: true, poolSize: 20, ssl: true
    });
    return client.db('Matcha').collection('Users');
    
}

//interets

router.post('/interests', async(req, res) => {
    const posts = await loadInterestsCollection();
    await posts.insertOne({
        interest: req.body.interest,
        text: req.body.text,
        user_id: req.params.id,
        createdAt: new Date()
    });
    res.status(201).send();
});

async function loadInterestsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Matcha').collection('interests');
    
}

//Preferences

router.post('/preferences', async(req, res) => {
    const posts = await loadpreferencesCollection();
    await posts.insertOne ({
        age: req.body.age,
        fame: req.body.number,
        location: req.body.location,
        user_id: req.params.id,
        createdAt: new Date()
    });
    res.status(201).send();
});

async function loadpreferencesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Matcha').collection('preferences');
}


module.exports = router;