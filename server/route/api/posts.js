const express = require('express');
const mongodb = require('mongodb');
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const Connection = require('./dbconnection');
const router = express.Router();
const sql = require('./sql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

router.get('/matches', async(req, res) =>
{
    Connection.con.getConnection((error, connect) => 
        {
        if (error) console.log(error);
        var sql = "SELECT * FROM Matcha_Users WHERE 1";
        
    connect.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result)
          //res.render('Matches.vue')
        });
      });
})

//Faker

//User
router.post('/register_user', async(req, res) => 
{
    
    let password = '';
    let email = '';
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
            console.log(error);
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
                Connection.con.connect(function(err) {
                    if(err) throw err;
                    Connection.con.query("SELECT * `FROM Matcha_Users` WHERE 1", function(err, result, fields){
                        if (err) throw err;
                        console.log(result);
                    })
                })
                console.log("hihihi")
                let transporter = nodemailer.createTransport({
                    service: 'gmail.com',
                    auth: {
                       user: 'unathinkomo16@gmail.com',
                       pass: '0786324448'
                  }
                });
          
                  var mailOptions = {
                      from: 'unathinkomo16@gmail.com',
                      to: req.body.email,
                      subject: 'Regestration verification',
                      html : `<a>verification link</a>`,
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Email sent: ' + info.response);
                  }
                  });

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
            if (results[0])
            {
                bcrypt.compare(req.body.pass, results[0].user_password, (error, response) => 
                {
                    if(error)
                    {
                        res.status(200).send(error);
                        return;
                    }
                    if (response)
                        res.status(200).send(results);
                    else
                    {
                        res.status(200).send(response);
                    }
                });
            }
            else
            {
                res.status(200).send(["notfound"]);
            }
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
    upload(req, res, async(error) => 
    {
        if (!req.file){
            return res.send({success: false});
        }
        else 
        {
            let name = req.file.originalname;
            let file_path = 'http://localhost:5000/api/posts/uploads/'+ req.body.username + '/' + name;
            const existPath = path.join(__dirname + '/uploads/tmp', name)
            const destPath = path.join(__dirname, "uploads/"+ req.body.username, name)
            try 
            {
                fs.renameSync(existPath, destPath)
            } 
            catch(err)
            {
                console.log(err);
            }
            let images = [];
            let role = 'profile';
            let pathfiles = __dirname + "/uploads/" + req.body.username;
            let files = await fs.promises.opendir(pathfiles);
            for await (const img of files)
            {
                images.push(img.name);
            }
            if (images.length > 1)
                role = 'none'
            let values = [
                file_path,
                name,
                role,
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

router.get('/uploads/:username/:name', (req, res) => 
{
    let file = __dirname + '/uploads/'+req.params.username +"/" + req.params.name;
    if (fs.existsSync(file))
    {
        res.sendFile(path.join(__dirname, "./uploads/"+ req.params.username +"/" + req.params.name));
    }
});

router.post('/uploads', async (req, res) => 
{
  let images = [];
  Connection.con.getConnection((err, connect) => 
  {
      if (err)
        return;
    connect.query(sql.select.image.all, req.body.userid, (error, results) => 
    {
        connect.release();
        if (error)
            return;
        if (results[0])
        {
            images = results;
        }
        res.status(201).send(images);
    });
  });
});

router.post('/set_profile_pic', async(req, res) => 
{
    Connection.con.getConnection((err, connect) =>
    {
        if (err)
            return;
        let params = [ 'profile', req.body.newId, 'none', req.body.oldId ];
        connect.query(sql.update.image.fields, params, (error, results) =>
        {
            connect.release();
            if (error)
                return;
            res.status(200).send(results);
        });
    });
});

router.post('/set_profile', async(req, res) => 
{
    Connection.con.getConnection((err, connect) =>
    {
        if (err)
            return;
        let params = [ 'profile', req.body.imageId ];
        connect.query(sql.update.image.field, params, (error, results) =>
        {
            connect.release();
            if (error)
                return;
            res.status(200).send(results);
        });
    });
});

router.post('/insert_language', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        connect.beginTransaction((err) => 
        {
            if (err)
            {
                res.status(200).send(err);
                return;
            }
            let arr = req.body.langName;
            arr.forEach(lang => 
            {
                let values = [
                    lang, 
                    req.body.userId
                ];
                connect.query(sql.select.language.check, values, (error, results) => 
                {
                    if (error)
                    {
                        connect.rollback(() => 
                        {
                            res.status(200).send(error);
                            return;
                        });
                    }
                    if (!results[0])
                    {
                        let values = [
                            lang, 
                            req.body.userId
                        ];
                        connect.query(sql.insert.language.fields, values, (error, results) => 
                        {
                            if (err)
                            {
                                connect.rollback(() =>
                                {
                                    res.status(200).send(err);
                                    return;
                                });
                            }
                        });
                    }
                });
                connect.commit((err) =>
                {
                    if (err)
                    {
                        connect.rollback(() =>
                        {
                            res.status(200).send(err)
                            return;
                        })
                    }
                });
            });
        });
        res.status(200).send({data:"Okay"});
        connect.release();
    });

});

router.post('/insert_interest', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        connect.beginTransaction((err) => 
        {
            if (err)
            {
                res.status(200).send(err);
                return;
            }
            let arr = req.body.interestName;
            arr.forEach(element => 
            {
                let params = [
                    element,
                    req.body.userId
                ];
                connect.query(sql.select.interest.check, params, (error, results) => 
                { 
                    if (error)
                    {
                        connect.rollback(() => 
                        {
                            res.status(200).send(error);
                            return;
                        });
                    } 
                    else 
                        if (!results[0]) 
                        {
                            let param = [
                                element,
                                req.body.userId
                            ];
                            connect.query(sql.insert.interest.fields, param, (error, results) => 
                            {
                                if (error)
                                {
                                    connect.rollback(() => 
                                    {
                                        res.status(200).send(error);
                                        return;
                                    });
                                }
                            });
                        }
                });
            });
            connect.commit((err) => 
            {
                if (err)
                {
                    connect.rollback(() => 
                    {
                        res.status(200).send(err);
                        return;
                    })
                }
            });
        });
        res.status(200).send({data:"okay"});
        connect.release();
    });

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
        let params = [req.body.interestName, req.body.userId];
        connect.query(sql.delete.interest.row, params, (error, results, fields) => 
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

router.post('/remove_image', async(req, res) => 
{
    Connection.con.getConnection((err, connect) => 
    {
        if (err)
            return;
        let imageLink = 'http://localhost:5000/api/posts/uploads/' + req.body.username + '/'+ req.body.picname;
        let imagePath = __dirname + '/uploads/' + req.body.username + '/'+ req.body.picname;
        let params = [
            imageLink,
            req.body.userId
        ];
        connect.query(sql.delete.image.row, params, (error, results) => 
        {
            connect.release();
            if (error)
                return;
            if (fs.existsSync(imagePath))
            {
                try 
                {
                    fs.unlinkSync(imagePath);
                } 
                catch (error) 
                {
                    console.log(error);
                }
            }
            res.status(200).send(results);
        });
    });
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
            req.body.street,
            req.body.postcode,
            req.body.city,
            req.body.country,
            req.body.state,
            req.body.userid
        ];
        connect.query(sql.update.user.fields, params, (error, results)=>
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
    res.status(200).send("Profile Updated Successfully");
});

router.post('/get_preferences', async(req, res) =>
{
    Connection.con.getConnection((error, connect) =>
    {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.preferences.all, param, (error, results) =>
        {
            connect.release();
            if (error)
            {
                res.send(error);
                return;
            }
            res.status(200).send(results);
        });
    });
});

router.post('/get_pref_interest', async(req, res) =>
{
    Connection.con.getConnection((error, connect) =>
    {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.Pref_interest.all, param, (error, results) =>
        {
            connect.release();
            if (error)
            {
                res.send(error);
                return;
            }
            res.status(200).send(results);
        });
    });
});

router.post('/update_preferences', async (req, res) => 
{
    Connection.con.getConnection((error, connect) =>
    {
        if (error)
            return;
        connect.beginTransaction((error) =>
        {
            if (error)
                return;
            let params = [
                req.body.age,
                req.body.gender,
                req.body.rating,
                req.body.language,
                req.body.location,
                req.body.userId,
            ];
            connect.query(sql.update.preferences.fields, params, (error, results) =>
            {
                if (error)
                {
                    connect.rollback(() =>
                    {
                        res.send(err)
                    });
                    return;
                }
            });
            let pref_arr = req.body.Interests
            pref_arr.forEach(interest =>
            {
                let params = [
                    interest,
                    req.body.userId
                ];
                let param = [
                    interest,
                    req.body.userId,
                    req.body.prefId,
                ];
                connect.query(sql.select.Pref_interest.check, params, (error, results) =>
                {
                    if (error)
                    {
                        connect.rollback(() =>
                        {
                            res.send(error);
                        });
                        return;
                    }
                    if (!results[0])
                    {
                        connect.query(sql.insert.Pref_interest.fields, param, (error, results) => 
                        {
                            if (error)
                            {
                                connect.rollback(() =>
                                {
                                    res.send(err)
                                });
                                return;
                            }
                        });
                    }
                });
            });
        });
        connect.commit((error) =>
        {
            if (error)
            {
                connect.rollback(() =>
                {
                    return;
                });
            }
        });
        connect.release();
        res.status(200).send('ok');
    });
});

router.post('/set_preferences', async(req, res) => 
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        connect.beginTransaction((error) =>
        {
            if (error)
                return;
            let params = [
                req.body.gender,
                req.body.age,
                req.body.location,
                req.body.rating,
                req.body.userId,
                req.body.language,
            ];
            connect.query(sql.select.preferences.all, req.body.userId, (error, results) =>
            {
                if (error)
                {
                    connect.rollback(() =>
                    {
                        res.send(error);
                    });
                    return;
                }
                if (!results[0])
                {
                    connect.query(sql.insert.preferences.fields, params, (error, results, fields) =>
                    {
                        if (error)
                        {
                            connect.rollback((error) =>
                            {
                                res.status(200).send(error);
                                 return; 
                            });
                        }
                        let pref_arr = req.body.Interests
                        pref_arr.forEach(interest =>
                        {
                            let params = [
                                interest,
                                req.body.userId
                            ];
                            let param = [
                                interest,
                                req.body.userId,
                                results.insertId
                            ];
                            connect.query(sql.select.Pref_interest.check, params, (error, results) =>
                            {
                                if (error)
                                {
                                    connect.rollback(() =>
                                    {
                                        res.send(error);
                                    });
                                    return;
                                }
                                if (!results[0])
                                {
                                    connect.query(sql.insert.Pref_interest.fields, param, (error, results) => 
                                    {
                                        if (error)
                                        {
                                            connect.rollback(() =>
                                            {
                                                res.send(err)
                                            });
                                            return;
                                        }
                                    });
                                }
                            });
                        });
                    });
                }

            });

        });
        connect.commit((error) => 
        {
            if (error)
            {
                connect.rollback(() =>
                {
                    res.send(error);
                    return;
                });
            }
        });
        connect.release();
        res.send("Saved successfully.")
    });
});

router.post('/remove_pref_interest', async(req, res) =>
{
    Connection.con.getConnection((err, connect) =>
    {
        if (err)
            return;
        let params = [
            req.body.prefInterest,
            req.body.userId
        ];
        connect.query(sql.delete.Pref_interest.row, params, (error, results) =>
        {
            connect.release();
            if (error)
            {
                res.send(err);
                return;
            }
        })
    });
    res.status(200).send('ok');
});

//Likes

router.post('/like', async(req, res) =>
 {
    Connection.con.getConnection((err, connect) =>
    {
        connect.beginTransaction((error) =>
        {
            if (error)
                return;
            let params = [
                req.body.liking,
                req.body.userId
            ]
            connect.query(sql.select.likes.all, params, (error, results) =>
            {
                if (error)
                {
                    connect.rollback(() => {
                        res.send(error);
                    })
                    return;
                }
                if (!results[0])
                {
                    let param = [
                    req.body.liking]
                    connect.query(sql.select.user.likes, param, (error, results) => {
                        if (error)
                        {
                            connect.rollback(() => {
                                res.send(error);
                            })
                            return;
                        }
                        if (results[0])
                        {
                            let likes = results[0].user_likes + 1;
                            let values = [
                                likes,
                                req.body.liking 
                            ]
                            connect.query(sql.update.user.likes, values, (error, results) => {
                                if (error)
                                {
                                    connect.rollback(() => {
                                        res.send(error);
                                    })
                                    return;
                                }

                            });
                        }
                    });
                }
            })
         
        });
        connect.commit((error) =>
        {
            if (error)
            {
                connect.rollback(() =>
                {
                    return;
                });
            }
        });
        connect.release();
        res.status(200).send('ok');
    });
});
module.exports = router;