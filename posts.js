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

//User

router.post('/update_coordinates', async(req, res) =>
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        let param = [
            req.body.lati,
            req.body.longi,
            req.body.userid
        ];
        connect.query(sql.update.user.coordinates, param, (error, result) =>
        {
            connect.release();
            if (error)
                return;
            res.send(result)
        });
    });
});

router.get('/matches', async(req, res) =>
{
    Connection.con.getConnection((error, connect) => 
    {
        if (error)
            return;
        connect.query(sql.select.matches.all, (error, result) => {
            connect.release();
            if (error)
                return;
            res.send(result)
        });
    });
});

router.post('/register_user', async(req, res) => {

    let password = '';
    let email = '';

    if (req.body.confirm === req.body.pass) {
        password = bcrypt.hashSync(req.body.pass, 8)
        var token = bcrypt.hashSync('toptoptop', 9)
        token = token.replace('/', 'k');
        let values = [
            token,
            req.body.username,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            password,
            req.body.gender,
            req.body.race,
            req.body.date
        ];
        Connection.con.getConnection((error, connect) => 
        {
            if (error)
                return;
            connect.query(sql.insert.user.fields, values, (error, results, fields) => 
            {
                connect.release();
                if (error) {
                    res.status(200).send({'code': error.code, 'msg': error.sqlMessage});
                    return;
                }
                let transporter = nodemailer.createTransport({
                    service: 'gmail.com',
                    auth: {
                        user: 'matchateam.mailroom@gmail.com',
                        pass: 'matcha>tinder'
                    }
                });
                var mailOptions = {
                    from: 'matchateam.mailroom@gmail.com',
                    to: req.body.email,
                    subject: 'Regestration verification',
                    html: `<a href=http://localhost:8080/verify/${token}/${req.body.email}>verification link</a>`,
                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                let directory = __dirname + '/uploads/' + req.body.username;
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory, { recursive: true });
                }
                res.send("User Registered");
            });
        });
    } else {
        res.send("Password do not match!");
    }
});

router.post('/online', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.online,
            req.body.userId
        ];
        connect.query('Update Matcha_Users SET user_online = ? WHERE user_id = ?', param, async(error, results) => {
            if (error)
                return;
            res.send('ok');
        });
    });
});

router.post('/logout', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.online,
            req.body.lastseen,
            req.body.userId
        ];
        connect.query('Update Matcha_Users SET user_online = ?, user_last_seen = ? WHERE user_id = ?', param, async(error, results) => {
            connect.release();
            if (error)
                return;
            res.send('ok');
        });
    });
});

router.post('/login_user', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let values = [
            req.body.email,
            req.body.email
        ];
        connect.query(sql.select.user.login, values, (error, results) => {
            connect.release();
            if (error) {
                res.status(200).send(error);
                return;
            }
            if (results[0]) {
                if (results[0].verify == 0)
                {
                    res.status(200).send(['notverified']);
                } else
                {
                    bcrypt.compare(req.body.pass, results[0].user_password, (error, response) => {
                        if (error) {
                            res.status(200).send(error);
                            return;
                        }
                        if (response) {

                            res.status(200).send(results);
                        }
                        else {
                            res.status(200).send(response);
                        }
                    }); 
                }
            } else {
                res.status(200).send(["notfound"]);
            }
        });
    });
});

//reset
router.post('/account/send_verification', async(req, res) =>
{
    Connection.con.getConnection((error, connect) =>
    {
        if (error)  console.log(error);
        var sql = "SELECT * FROM Matcha_Users WHERE user_email = ?";
        let param = [ req.body.email ];
        connect.query(sql, param, function (err, result) {
            if (err) throw err;
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
                  subject: 'change your password',
                  html : `<a href=http://localhost:8080/changepassword/${req.body.email}>verification link</a>`,
              };
              
              transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  console.log(error);
              } else {
                  console.log('Email sent: ' + info.response);
              }
              });
        }
        )
    })
    
})

router.post('/upload', async(req, res) => {
    let dest = 'server/route/api/uploads/tmp';
    let store = multer.diskStorage({
        destination: dest,
        filename: (req, file, cb) => { cb(null, file.originalname) }
    });

    let upload = multer({ storage: store }).single('file');
    upload(req, res, async(error) => {
        if (!req.file) {
            return res.send({ success: false });
        } else {
            let name = req.file.originalname;
            let file_path = 'http://localhost:5000/api/posts/uploads/' + req.body.username + '/' + name;
            const existPath = path.join(__dirname + '/uploads/tmp', name)
            const destPath = path.join(__dirname, "uploads/" + req.body.username, name)
            try {
                fs.renameSync(existPath, destPath)
            } catch (err) {
                console.log(err);
            }
            let images = [];
            let role = 'profile';
            let pathfiles = __dirname + "/uploads/" + req.body.username;
            let files = await fs.promises.opendir(pathfiles);
            for await (const img of files) {
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
            Connection.con.getConnection((error, connect) => {
                if (error)
                    return;
                connect.query(sql.insert.image.fields, values, (error, results) => {
                    connect.release();
                    if (error) {
                        res.send({ success: false });
                        return;
                    }
                    res.send({ success: true });
                });

            });
        }
    });
});

//changepassword
router.post('/change_password', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let pass =  bcrypt.hashSync(req.body.pass, 8)
        let param = [
            req.body.email
        ];
        let sql = "SELECT * from Matcha_Users WHERE user_email = ? ";
        connect.query(sql, param, function(err, results) {
            if(err) {
                return;
            } else if (results) {
                let value = [pass, req.body.email];
                sql = "UPDATE  Matcha_Users set user_password = ? WHERE user_email = ?";
                connect.query(sql, value, function(err, results) {
                    connect.release();
                    if (err) {
                        return;
                    }
                    res.send('ok')
                })
            }
        })
    })
})

//verify

router.post('/verify', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error) console.log(error)
        let sql = "SELECT * from Matcha_Users WHERE user_email = ? and user_token = ?";
        let param = [
            req.body.email,
            req.body.token
        ];
        connect.query(sql, param, function(err, results) {
            if (err) {
                throw err;
            } else if (results) {
                let value = [req.body.email]
                sql = "UPDATE  Matcha_Users set verify = 1 WHERE user_email = ?";
                connect.query(sql, value, function(err, results) {
                    if (err) {
                        res.send(err)
                    }
                    res.send('ok')
                })
            }
        })
    })
})


router.get('/uploads/:username/:name', (req, res) => {
    let file = __dirname + '/uploads/' + req.params.username + "/" + req.params.name;
    if (fs.existsSync(file)) {
        res.sendFile(path.join(__dirname, "./uploads/" + req.params.username + "/" + req.params.name));
    }
});

router.post('/uploads', async(req, res) => {
    let file = __dirname + '/uploads/' + req.body.username;
    Connection.con.getConnection((err, connect) => {
        if (err)
            return;
        connect.query(sql.select.image.all, req.body.userid, (error, results) => {
            connect.release();
            if (error)
                return;
            if (results[0]) {
                if (fs.existsSync(file))
                {
                    res.send(results);
                }
            } else {
                res.send('nopics');
            }
        });
    });
});

router.post('/set_profile_pic', async(req, res) => {
    Connection.con.getConnection((err, connect) => {
        if (err)
            return;
        let params = ['profile', req.body.newId, 'none', req.body.oldId];
        connect.query(sql.update.image.fields, params, (error, results) => {
            connect.release();
            if (error)
                return;
            res.status(200).send(results);
        });
    });
});

router.post('/set_profile', async(req, res) => {
    Connection.con.getConnection((err, connect) => {
        if (err)
            return;
        let params = ['profile', req.body.imageId];
        connect.query(sql.update.image.field, params, (error, results) => {
            connect.release();
            if (error)
                return;
            res.status(200).send(results);
        });
    });
});

router.post('/insert_language', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.beginTransaction((err) => {
            if (err) {
                res.status(200).send(err);
                return;
            }
            let arr = req.body.langName;
            arr.forEach(lang => {
                let values = [
                    lang,
                    req.body.userId
                ];
                connect.query(sql.select.language.check, values, (error, results) =>
                {
                    if (error) {
                        connect.rollback(() => {
                            res.status(200).send(error);
                            return;
                        });
                    }
                    if (!results[0]) {
                        let values = [
                            lang,
                            req.body.userId
                        ];
                        connect.query(sql.insert.language.fields, values, (error, results) => 
                        {
                            if (err) {
                                connect.rollback(() => {
                                    res.status(200).send(err);
                                    return;
                                });
                            }
                        });
                    }
                });
                connect.commit((err) => {
                    if (err) {
                        connect.rollback(() => {
                            res.status(200).send(err)
                            return;
                        })
                    }
                });
            });
        });
        res.status(200).send({ data: "okay" });
        connect.release();
    });

});

router.post('/insert_interest', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.beginTransaction((err) => {
            if (err) {
                res.status(200).send(err);
                return;
            }
            let arr = req.body.interestName;
            arr.forEach(element => {
                let params = [
                    element,
                    req.body.userId
                ];
                connect.query(sql.select.interest.check, params, (error, results) => {
                    if (error) {
                        connect.rollback(() => {
                            res.status(200).send(error);
                            return;
                        });
                    } else
                    if (!results[0]) {
                        let param = [
                            element,
                            req.body.userId
                        ];
                        connect.query(sql.insert.interest.fields, param, (error, results) => {
                            if (error) {
                                connect.rollback(() => {
                                    res.status(200).send(error);
                                    return;
                                });
                            }
                        });
                    }
                });
            });
            connect.commit((err) => {
                if (err) {
                    connect.rollback(() => {
                        res.status(200).send(err);
                        return;
                    })
                }
            });
        });
        res.status(200).send({ data: "okay" });
        connect.release();
    });

});

router.get('/get_interest:userid', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let params = [req.params.userid];
        connect.query(sql.select.interest.all, params, (error, results) => {
            connect.release();
            if (error) {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        })
    })
});

router.get('/get_language:userid', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let params = [req.params.userid];
        connect.query(sql.select.language.all, params, (error, results) => {
            connect.release();
            if (error) {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        })
    })
});

router.post('/remove_language', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let params = [req.body.langId, req.body.userId];
        connect.query(sql.delete.language.row, params, (error, results) => {
            connect.release();
            if (error) {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        });
    })

});

router.post('/remove_interest', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let params = [req.body.interestName, req.body.userId];
        connect.query(sql.delete.interest.row, params, (error, results, fields) => {
            connect.release();
            if (error) {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results)
        });
    })

});

router.post('/remove_image', async(req, res) => {
    Connection.con.getConnection((err, connect) => {
        if (err)
            return;
        let imageLink = 'http://localhost:5000/api/posts/uploads/' + req.body.username + '/' + req.body.picname;
        let imagePath = __dirname + '/uploads/' + req.body.username + '/' + req.body.picname;
        let params = [
            imageLink,
            req.body.userId
        ];
        connect.query(sql.delete.image.row, params, (error, results) => {
            connect.release();
            if (error)
                return;
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).send(results);
        });
    });
});

router.get('/details:userid', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let params = [req.params.userid];
        connect.query(sql.select.user.details, params, (error, results, fields) => {
            connect.release();
            if (error) {
                res.status(200).send(error);
                return;
            }
            res.status(200).send(results);
        });
    })
});

router.post('/update_profile', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error) {
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
            req.body.latitude,
            req.body.longitude,
            req.body.userid
        ];
        connect.query(sql.update.user.fields, params, (error, results) => {
            connect.release();
            if (error) {
                console.log(error);
                return;
            }
        });
    })
    res.status(200).send("Profile Updated Successfully");
});

router.post('/get_preferences', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.preferences.all, param, (error, results) => {
            connect.release();
            if (error) {
                res.send(error);
                return;
            }
            res.status(200).send(results);
        });
    });
});

router.post('/get_pref_interest', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.Pref_interest.all, param, (error, results) => {
            connect.release();
            if (error) {
                res.send(error);
                return;
            }
            res.status(200).send(results);
        });
    });
});

router.post('/update_preferences', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.beginTransaction((error) => {
            if (error)
                return;
            let params = [
                req.body.age,
                req.body.gender,
                req.body.rating,
                req.body.location,
                req.body.userId,
            ];
            connect.query(sql.update.preferences.fields, params, (error, results) => {
                if (error) {
                    connect.rollback(() => {
                        console.log(error);
                    });
                    return;
                }
            });
        });
        connect.commit((error) => {
            if (error) {
                connect.rollback(() => {
                    return;
                });
            }
        });
        connect.release();
        res.status(200).send('ok');
    });
});

router.post('/set_preferences', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.beginTransaction((error) => {
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
            connect.query(sql.select.preferences.all, req.body.userId, (error, results) => {
                if (error) {
                    connect.rollback(() => {
                        res.send(error);
                    });
                    return;
                }
                if (!results[0]) {
                    connect.query(sql.insert.preferences.fields, params, (error, results, fields) => {
                        if (error) {
                            connect.rollback((error) => {
                                res.status(200).send(error);
                                return;
                            });
                        }
                    });
                }

            });

        });
        connect.commit((error) => {
            if (error) {
                connect.rollback(() => {
                    res.send(error);
                    return;
                });
            }
        });
        connect.release();
        res.send("Saved successfully.")
    });
});

router.post('/remove_pref_interest', async(req, res) => {
    Connection.con.getConnection((err, connect) => {
        if (err)
            return;
        let params = [
            req.body.prefInterest,
            req.body.userId
        ];
        connect.query(sql.delete.Pref_interest.row, params, (error, results) => {
            connect.release();
            if (error) {
                res.send(err);
                return;
            }
        })
    });
    res.status(200).send('ok');
});

router.post('/like', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.beginTransaction((error) => {
            if (error)
                return;
            let params = [
                req.body.liking,
                req.body.userId
            ]
            connect.query(sql.select.likes.all, params, (error, results) => {
                if (error) {
                    connect.rollback(() => {
                        res.send(error);
                    });
                    return;
                }
                if (!results[0]) {
                    let param = [
                        req.body.liking
                    ];
                    connect.query(sql.select.user.likes, param, (error, results) => {
                        if (error) {
                            connect.rollback(() => {
                                res.send(error);
                            });
                            return;
                        }
                        if (results[0]) {
                            let userRaters = results[0].user_raters + 1;
                            let rating = req.body.rating
                            let userRatingsSum = results[0].user_ratings_sum + rating;
                            let avg = userRatingsSum / userRaters
                            let values = [
                                userRaters,
                                userRatingsSum,
                                avg,
                                req.body.liking
                            ]
                            connect.query(sql.update.user.likes, values, (error, results) => {
                                if (error) {

                                    connect.rollback(() => {
                                        res.send(error);
                                    });
                                    return;
                                }

                            });
                            let para = [
                                req.body.liking,
                                req.body.userId,
                                rating
                            ];
                            connect.query(sql.insert.Likes.fields, para, (error, results) => {
                                if (error) {
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
        connect.commit((error) => {
            if (error) {
                connect.rollback(() => {
                    return;
                });
            }
        });
        connect.release();
    });
});

//unlike
router.post('/unlike', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.beginTransaction((error) => {
            if (error)
                return;
            let sqll = 'UPDATE FROM Matcha_Likes SET like_check = 0 WHERE user_liked_id = ? AND user_liker_id = ?'; 
            let like_check = 1;
            let params = [
                like_check,
                req.body.liking,
                req.body.userId
            ];
            connect.query(sqll, params, (error, results) => {
                if (error){
                    connect.rollback(() => {
                        res.send(error);
                    });
                    return;
                }
                if (!results[0]) {
                    let param = [
                        req.body.liking
                    ];
                    connect.query(sqll, param, (error, results) => {
                        connect.release();
                        if (error) {
                            connect.rollback(() => {
                                res.send(error);
                            });
                            return;
                        }
                    });
                } else {
                    connect.release();
                }
            })

        });
        connect.commit((error) => {
            if (error) {
                connect.rollback(() => {
                    return;
                });
            }
        });
        connect.release();
    });
});

//block
router.post('/blocking', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.beginTransaction((error) => {
            if (error)
                return;
            let sqll = 'SELECT * FROM Matcha_block WHERE blocker_id = ? AND blocked_id = ?'; 
            let params = [
                req.body.liking,
                req.body.userId
            ];
            connect.query(sqll, params, (error, results) => {
                console.log(error);
                if (error){
                    connect.rollback(() => {
                        res.send(error);
                    });
                    return;
                }
                if (!results[0]) {
                    let sql = 'INSERT INTO Matcha_block (blocker_id, blocked_id) VALUES (?, ?)'; 
                    connect.query(sql, params, (error, results) => {
                        connect.release();
                        if (error) {
                            connect.rollback(() => {
                                res.send(error);
                            });
                            return;
                        }
                        res.send('ok');
                    });
                } else {
                    connect.release();
                    res.send('ok');
                }
            })

        });
        connect.commit((error) => {
            if (error) {
                connect.rollback(() => {
                    return;
                });
            }
        });
    });
});

router.post('/get_blocked', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.query('SELECT * FROM Matcha_block WHERE blocked_id = ?', req.body.userId, (error, results) => {
            connect.release();
            if (error) {
                return;
            }
            res.send(results);
        });
    });
});


router.post('/check_dislike', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.query('SELECT * FROM Matcha_Likes WHERE like_check = 0', (error, results) => {
            connect.release();
            if (error) {
                return;
            }
            res.send(results);
        });
    });
});

router.post('/matching', async (req, res) => 
{
    Connection.con.getConnection((error, connect) =>
    {
        if (error)
            return;
        let sql = 'SELECT user_age, user_latitude, user_longitude FROM Matcha_Users WHERE user_id = ?';
        let param = [
            req.body.userId
        ]
        connect.beginTransaction((err) =>
        {
            if (err)
                return;
            connect.query(sql, param, (error, results) =>
            {
                if (error)
                    return;
                let lat = results[0].user_latitude;
                let longi = results[0].user_longitude;
                let sqlAll = 'SELECT user_id, user_name, user_age, user_first_name, user_last_name, user_online, user_last_seen, user_gender, user_latitude, user_longitude FROM Matcha_Users WHERE NOT user_id = ?';
                let sqldist = 'SELECT pref_age, preferred_gender, preferred_location FROM  Matcha_User_preferences WHERE user_id = ?';
                let userDist = 0;
                let age = 0;
                let prefGender;
                connect.query(sqldist, param, (error, results) =>
                {
                    if (error)
                        return;
                    if (results[0])
                    {
                        userDist = results[0].preferred_location;
                        age = results[0].pref_age;
                        prefGender = results[0].preferred_gender;
                        prefLang = results[0].pref_lang;
                    }
                });
                connect.query(sqlAll, param, (error, results) =>
                {
                    if (error)
                        return;
                    let users = results;
                    res.status(200).send({ 'matchData': users, 'userData':{ 'lat': lat, 'longi':longi, 'age':age, 'userDist':userDist, 'prefGender':prefGender } });
                });
            });
        });
        connect.commit((err) =>
        {
            if (err)
            {
                connect.rollback(() =>
                {
                    return;
                });
            }
        });
        connect.release();
    });
});

router.post('/read_interests', async(req, res) => {
    let arr = [];
    let interest = [];
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let sql = `SELECT interest_name FROM Matcha_User_Interests WHERE user_id = ?`;
        connect.query(sql, req.body.userId, (error, results) => {
            if (error)
                return;
            if (Object.keys(results).length !== 0)
            {
                arr = results;
                connect.query(sql, req.body.otherUser, (error, result) => {
                    connect.release();
                    if (error)
                        return;
                    if (Object.keys(result).length !== 0)
                    {
                        interest = result;
                        res.status(200).send({ 'user': arr, 'otherUser': interest});
                        return;
                    }
                })
            }
        });
    });
});

router.post('/retrieve_history_ids', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.history.all, param, (error, results) => {
            connect.release();
            if (error)
                return;
            if (results[0])
            {
                res.status(200).send(results);
                return;
            }
        });
    });
});

router.post('/people_who_liked_you', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query('SELECT * FROM Matcha_Likes WHERE user_liked_id = ?', param, (error, results) => {
            connect.release();
            if (error)
                return;
            if (results[0])
            {
                res.status(200).send(results);
                return;
            }
        });
    });
});

router.post('/people_who_viewed_you', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query('SELECT * FROM Matcha_User_History WHERE user_checked_id = ?', param, (error, results) => {
            connect.release();
            if (error)
                return;
            if (results[0])
            {
                res.status(200).send(results);
                return;
            }
        });
    });
});

router.post('/retrieve_history_info', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.history.user, param, (error, results) => {
            connect.release();
            if (error)
                return;
            if (results[0])
            {
                res.status(200).send(results);
                return;
            }
        });
    });
});

router.post('/put_history', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.checkedId,
            req.body.checkerId
        ];
        connect.query(sql.select.history.check, param, (error, results) => {
            if (error)
                return;
            if (!results[0])
            {
                connect.query(sql.insert.History.fields, param, (error, results) => {
                    connect.release();
                    if (error)
                        return;
                    res.status(200).send('ok');
                    return;
                });
            } else {
                connect.release();
                res.status(200).send('ok');
            }
        });
    });
});

router.post('/search_with_one', async(req, res) => {
    let query = ''
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        connect.query(sql.select.preferences.all, req.body.userId, (error, results) => {
            if (error)
                return;
            let param = '';
            if (!results[0])
            {
                if (req.body.type === 'age')
                query = sql.select.user.searchWithAge;
                else if (req.body.type === 'rating')
                            query = sql.select.user.searchWithRating;
                param = [
                    req.body.value
                ];
            } else {
                let gender = results[0].preferred_gender;
                if (req.body.type === 'age')
                     query = sql.select.user.searchWith + 'user_age <= ?  AND user_gender = ?';
                else if (req.body.type === 'rating')
                            query = sql.select.user.searchWith + 'user_rating_avg <= ? AND user_rating_avg > 0.0 AND user_gender = ?';
                param = [
                    req.body.value,
                    gender
                ];
            }
            connect.query(query, param, (error, results) => {
                connect.release();
                if (error)
                    return;
                res.status(200).send(results);
                return;
            });
        });
    });
});

router.post('/search_with_distance', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
        {
            return;
        }
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.user.details, param, (error, results) => {
            if (error)
            {
                return;
            }
            connect.query(sql.select.preferences.all, param, (error, result) => {
                if (error)
                {
                    return;
                }
                let sql_stmt = '';
                if (result[0])
                    sql_stmt = sql.select.user.searchWithDist + ` WHERE user_gender = '${result[0].preferred_gender}'`;
                else
                    sql_stmt = sql.select.user.searchWithDist;
                connect.query(sql_stmt, (error, result) => {
                    connect.release();
                    if (error)
                    {
                        return;
                    }
                    res.status(200).send({'matchData': result, 'userData': results});
                });
            });
        });
    });
});

router.post('/search_with_two', async(req, res) => {
    let query = '';
    Connection.con.getConnection((error, connect) => {
        if (error)
        {
            return;
        }
        let param = [
            req.body.userId
        ];
        connect.query(sql.select.preferences.all, param, (error, results) => {
            if (error)
            {
                res.send('error');
                return;
            }
            let user = [];
            connect.query(sql.select.user.details, param, (error, result) => {
                if (error)
                {
                    res.send('error');
                    return;
                }
                user = result;
            });
            if (req.body.type === 'age&rating')
                query = sql.select.user.searchWithAgeRating;
            else if (req.body.type === 'age&dist')
                        query = sql.select.user.searchWithAgeDist;
            else if (req.body.type === 'rating&dist')
                    query = sql.select.user.searchWithRatingDist
            if (!results[0])
            {
                let params = '';
                if (req.body.type === 'age&rating')
                {
                    params = [
                        req.body.number,
                        req.body.value
                    ];
                }
                else
                {
                    params = [
                        req.body.number
                    ];
                }
                connect.query(query, params, (error, results) => {
                    connect.release();
                    if (error)
                    {
                        res.send('error');
                        return;
                    }
                    if (req.body.type === 'age&rating')
                        res.status(200).send(results)
                    else 
                        res.status(200).send({'matchData': results, 'userData': user})
                });
            } 
            else
            {
                query += ` AND user_gender = ?`
                let params = '';
                if (req.body.type === 'age&rating')
                {
                    params = [
                        req.body.number,
                        req.body.value,
                        results[0].preferred_gender
                    ];
                }
                else
                {
                    params = [
                        req.body.number,
                        results[0].preferred_gender
                    ];
                }
                connect.query(query, params, (error, results) => {
                    connect.release();
                    if (error)
                    {
                        res.send('error');
                        return;
                    }
                    if (req.body.type === 'age&rating')
                        res.status(200).send(results)
                    else
                        res.status(200).send({'matchData': results, 'userData': user})
                });
            }
        });
    });
});

router.post('/search_with_all', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let param = [
            req.body.userId,
        ];
        connect.query(sql.select.preferences.all, param, (error, results) => {
            if (error)
                return;
            let params;
            let user = [];
            connect.query(sql.select.user.details, param, (error, result) => {
                if (error)
                {
                    res.send('error');
                    return;
                }
                user = result;
            });
            if (!results[0])
            {
                params = [
                    req.body.age,
                    req.body.rating
                ];
                connect.query(sql.select.user.searchWithAllGender, params, (error, results) => {
                    connect.release();
                    if (error)
                        return;
                    res.status(200).send({ 'matchData': results, 'userData': user });
                });
            } else {
                params = [
                    req.body.age,
                    req.body.rating,
                    results[0].preferred_gender
                ];
                connect.query(sql.select.user.searchWithAll, params, (error, results) => {
                    connect.release();
                    if (error)
                        return;
                    res.status(200).send({ 'matchData': results, 'userData': user });
                });
            }
        });
    });
});

router.post('/get_profile_picture', async(req, res) => {
    Connection.con.getConnection((error, connect) => {
        if (error)
            return;
        let params = ['profile'];
        connect.query(sql.select.image.all_profile, params, (error, results) => {
            connect.release();
            if (error)
                return;
            if (results[0])
                res.status(200).send(results);
        });
    });
});

module.exports = router;