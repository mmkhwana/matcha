const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Users
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    if (req.body.confirm == req.body.pass)
    {
        var password = req.body.pass;
        await posts.insertOne({
            username: req.body.username,
            name: req.body.text,
            email: req.body.email,
            pass : password,
            createdAt: new Date()
        });
        res.status(201).send();
    }
});

router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne ({_id: new mongodb.ObjectID(req.params.id)}); 
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Matcha').collection('Users');
    
}

//Interests
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

    return client.db('Matcha').collection('Interests');
}

//Preferences
router.post('/preferences', async(req, res) => {
    const posts = await loadPreferCollection();
    await posts.insertOne({
        age: req.body.age,
        fame: req.body.number,
        location: req.body.location,
        user_id: req.params.id,
        createdAt: new Date()
    });
    res.status(201).send();
});
async function loadPreferCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    return client.db('Matcha').collection('Preferences');
    
}

module.exports = router;