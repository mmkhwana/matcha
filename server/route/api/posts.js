const express = require('express');
const mongodb = require('mongodb');
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const Connection = require('./dbconnection');
const router = express.Router();
const sql = require('./sql');
const bcrypt = require('bcrypt');

//User

router.post('/register_user', async(req, res) => 
{
    let password = '';
    if (req.body.confirm === req.body.pass)
    {
        password = bcrypt.hashSync(req.body.pass, 8)
        let values = [
            req.body.username,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            password,
            req.body.gender,
            req.body.date
        ];
        Connection.con.getConnection((error, connect) => 
        {
            if (error)
                return;
            connect.query(sql.insert.user.fields, values, (error, results, fields) => 
            {
                connect.release();
                if (error)
                {
                    res.status(200).send(results);
                    return;
                }
                let directory = __dirname + '/uploads/'+req.body.username;
                if (!fs.existsSync(directory))
                {
                    fs.mkdirSync(directory,{ recursive: true });
                }
                res.send("User Registered");
            });
        });
    }
    else
    {
        res.send("Password do not match!");
    }
});

router.post('/login_user', async(req, res) =>
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return ;
        let values = [
            req.body.email,
            req.body.email
        ];
        connect.query(sql.select.user.login, values, (error, results) =>
        {
            connect.release();
            if (error)
            {
                res.status(200).send(results);
                return;
            }
            bcrypt.compare(req.body.pass, results[0].user_password, (error, response) => 
            {
                if(error)
                    return;
                if (response)
                    res.status(200).send(results);
                else
                {
                    res.status(200).send(response);
                }
            });
        });
    });
});

router.post('/upload', async(req, res) => 
{
    let dest = 'server/route/api/uploads/tmp';
    let store = multer.diskStorage({
        destination: dest,
        filename: (req, file, cb) => { cb(null, file.originalname)}
    });
    
    let upload = multer({storage: store}).single('file');
    upload(req, res, (error) => 
    {
        if (!req.file){
            return res.send({success: false});
        }
        else 
        {
            let file_path = 'http://localhost:5000/api/posts/uploads/'+ req.body.username + '/' + req.file.originalname;
            const existPath = path.join(__dirname + '/uploads/tmp', req.file.originalname)
            const destPath = path.join(__dirname, "uploads/"+ req.body.username, req.file.originalname)
            try 
            {
                fs.renameSync(existPath, destPath)
            } 
            catch(err)
            {
                console.log(err);
            }
            let values = [
                file_path,
                'profile',
                req.body.userid
            ];
            Connection.con.getConnection((error, connect) =>
            {
                if (error)
                    return;
                connect.query(sql.insert.image.fields, values, (error, results) => 
                {
                    connect.release();
                    if (error)
                    {
                        res.send({success: false});
                        return;
                    }
                    res.send({success: true});
                });
                
            });
        }
    });
});

router.get('/uploads/:username/:name', (req, res) => {
    res.sendFile(path.join(__dirname, "./uploads/"+ req.params.username +"/" + req.params.name));
});

router.get('/uploads:username', async (req, res) => {
  let images = []
  const path = __dirname + "/uploads/" + req.params.username;
  const folder = await fs.promises.opendir(path);
  for await (const image_path of folder) 
  {
    images.push(image_path.name);
  }
  res.status(201).send(images);
});

router.post('/insert_language', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        let values = [];
        let arr = req.body.langName;
        arr.forEach(lang => 
        {
            values.push([lang, req.body.userId]);
        });
        connect.query(sql.insert.language.fields, [values], (error, results) => 
        {
            connect.release();
            if (error)
            {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results)
        });
    })

});

router.post('/insert_interest', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        let params = [];
        let arr = req.body.interestName;
        arr.forEach(element => 
        {
            params.push([element, req.body.userId]);
        });
        connect.query(sql.insert.interest.fields, [params], (error, results) => 
        {
            connect.release();
            if (error)
            {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results)
        });
    })

});

router.get('/get_interest:userid', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        let params = [req.params.userid];
        connect.query(sql.select.interest.all, params, (error, results) =>
        {
            connect.release();
            if (error)
            {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        })
    })
});

router.get('/get_language:userid', async(req, res) =>
{
    Connection.con.getConnection((error, connect) =>
    {
        if (error)
            return;
        let params = [req.params.userid];
        connect.query(sql.select.language.all, params, (error, results) => 
        {
            connect.release();
            if (error)
            {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        })
    })
});

router.post('/remove_language', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        let params = [req.body.langId,req.body.userId];
        connect.query(sql.delete.language.row, params, (error, results) => 
        {
            connect.release();
            if (error)
            {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        });
    })

});

router.post('/remove_interest', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        let params = [req.body.interestId, req.body.userId];
        connect.query(sql.delete.interest.row, params, (error, results) => 
        {
            connect.release();
            if (error)
            {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results)
        });
    })

});

router.get('/details:userid', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if(error)
            return;
        let params = [req.params.userid];
        connect.query(sql.select.user.details, params, (error, results, fields) => 
        {
            connect.release();
            if (error)
            {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        });
    })
});

router.post('/update_profile', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if(error)
        {
            console.log(error);
            return;
        }
        let params = [
            req.body.firstname,
            req.body.lastname,
            req.body.biography,
            req.body.relation,
            req.body.height,
            req.body.age,
            req.body.race,
            req.body.hair,
            req.body.userid
        ];
        connect.query(sql.update.user.fields, params, (error, results)=>
        {
            connect.release();
            if (error)
            {
                console.log(error);
                return ;
            }
        });
    })
    res.status(200).send("Profile Updated Successfully");
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