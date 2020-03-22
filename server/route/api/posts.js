const express = require('express');
const mongodb = require('mongodb');
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const router = express.Router();

//User
router.get('/', async(req, res) => {
    const posts = await loadUsersCollection();
    res.send(await posts.find({}).toArray());
});

router.get('/login', async(req, res) => {
    const posts = await loadUsersCollection();
    res.send(await posts.find({email: req.query.email, pass: req.query.pass}).toArray());
});

const store = multer.diskStorage({
    filename: (req, file, cb) => { cb(null, file.originalname)},  
    destination: function (res, file, cb){ cb(null, 'server/route/api/uploads')}
});

const upload = multer({storage: store});

router.post('/upload', upload.single('file'), async(req, res) => 
{ 
    if (!req.file){
        return res.send({success: false});
    }
    else {
        //   res.status(200).json({file: req.query.file});
        var file_path = 'http://localhost:5000/api/posts/uploads/' + req.file.originalname;
        const images = await loadUsersImages();
        images.insertOne({
           image_path: file_path,
           image_type: false,
           user_id: '1'
        });
        return res.send({success: true});
    }
    /*const posts = await loadUsersCollection();
    res.send(await posts.find({email: req.query.email, pass: req.query.pass}).toArray());*/
});

router.get('/uploads/:name', (req, res) => {
    res.sendFile(path.join(__dirname, "./uploads/" + req.params.name));
});

router.get('/uploads', (req, res) => {
    res.status(201).send((fs.readdirSync(__dirname + "\\uploads")).filter(file => file.startsWith('picture')));
});

router.post('/', async(req, res) => {
    const posts = await loadUsersCollection();
    if (req.body.confirm === req.body.pass)
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
    else
    {
        res.status(200).send("Password do not match!");
    }
});
//Update User Profile
router.post('/update_profile', async(req, res) => {
    const profile = await loadUsersCollection();
    await profile.insertOne({
        biography: req.body.biography,
        Relationship: req.body.relation,
        Height: req.body.height,
        Age: req.body.age,
        Hair: req.body.hair,
        languages: req.body.languages,
        Interests: req.body.interests
    });
    res.status(200).send("Profile Udated Successfully");
});

router.delete('/:id', async(req, res) => {
    const posts = await loadUsersCollection();
    await posts.deleteOne ({_id: new mongodb.ObjectID(req.params.id)}); 
    res.status(200).send();
});

async function loadUsersCollection() {
   /* const client = await mongodb.MongoClient.connect('mongodb+srv://pntsunts:19930813@cluster0-fkexu.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true, useNewUrlParser: true
    });
    return client.db('Matcha').collection('Users');*/

    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true
    });

    return client.db('Matcha').collection('Users');
    
}

async function loadUsersImages() {
    /* const client = await mongodb.MongoClient.connect('mongodb+srv://pntsunts:19930813@cluster0-fkexu.mongodb.net/test?retryWrites=true&w=majority', {
         useUnifiedTopology: true, useNewUrlParser: true
     });
     return client.db('Matcha').collection('Users');*/
 
     const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
         useNewUrlParser: true, useUnifiedTopology: true
     });
 
     return client.db('Matcha').collection('Images');
     
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

router.post('/preference', async(req, res) => {
    const posts = await loadpreferencesCollection();
    await posts.insert ({
        age: req.body.age,
        rating: req.body.rating,
        gender: req.body.gender,
        language: req.body.language,
        location: req.body.location,
        interests: req.body.interests,
        user_id: req.params.id
    });
    res.status(201).send('done');
});

async function loadpreferencesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Peter:Tamarillo@12@cluster0-hqef0.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Matcha').collection('preferences');
}
module.exports = router;