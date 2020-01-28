const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

<<<<<<< HEAD
// Users
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
=======
//User

router.get('/', async(req, res) => {
    const posts = await loadUsersCollection();
    res.send(await posts.find({}).toArray());
});

router.get('/login', async(req, res) => {
    const posts = await loadUsersCollection();
    res.send(await posts.find({email: req.query.email, pass: req.query.pass}).toArray());
});

router.post('/', async(req, res) => {
    const posts = await loadUsersCollection();
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    if (req.body.confirm == req.body.pass)
    {
        var password = req.body.pass;
        await posts.insertOne({
<<<<<<< HEAD
            username: req.body.username,
            name: req.body.text,
            email: req.body.email,
            pass : password,
            createdAt: new Date()
        });
        res.status(201).send();
=======
            name: req.body.username,
            email: req.body.email,
            birth: req.body.date,
            pass: password
    });
    res.status(200).send("User Registered");
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    }
});

router.delete('/:id', async(req, res) => {
<<<<<<< HEAD
    const posts = await loadPostsCollection();
=======
    const posts = await loadUsersCollection();
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    await posts.deleteOne ({_id: new mongodb.ObjectID(req.params.id)}); 
    res.status(200).send();
});

<<<<<<< HEAD
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
=======
async function loadUsersCollection() {
   /* const client = await mongodb.MongoClient.connect('mongodb+srv://pntsunts:19930813@cluster0-fkexu.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true, useNewUrlParser: true
    });
    return client.db('Matcha').collection('Users');*/

    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    });

    return client.db('Matcha').collection('Users');
    
}

<<<<<<< HEAD
//Interests
=======
//interets

>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
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

<<<<<<< HEAD
    return client.db('Matcha').collection('Interests');
}

//Preferences
router.post('/preferences', async(req, res) => {
    const posts = await loadPreferCollection();
    await posts.insertOne({
=======
    return client.db('Matcha').collection('interests');
    
}

//Preferences

router.post('/preferences', async(req, res) => {
    const posts = await loadpreferencesCollection();
    await posts.insertOne ({
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
        age: req.body.age,
        fame: req.body.number,
        location: req.body.location,
        user_id: req.params.id,
        createdAt: new Date()
    });
    res.status(201).send();
});
<<<<<<< HEAD
async function loadPreferCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    return client.db('Matcha').collection('Preferences');
    
}

=======

async function loadpreferencesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Matcha').collection('preferences');
}


>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
module.exports = router;