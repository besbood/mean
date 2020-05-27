/**
 * mongodb名称：mean
 * 集合名称：users
 * 存储信息：user_name(用户名称), user_pasd(用户密码)
 */

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;

//设置允许跨域访问该服务
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

/*用户注册功能*/
app.post('/regist', function (req, res) {


    const request = {
        name: req.body.userName,
        password: req.body.password
    }

    function addUser(collection, db){
        collection.insert(db, function(err, results){
            if(!err){

            }
        })
    }

    MongoClient.connect("mongodb://localhost", function(err, db) {
        const myDB = db.db("mean");
        const insertObj = {
            user_name: request.name,
            user_pasd: request.password
        }
        myDB.collection("users", { useNewUrlParser: true }, function(err, data) {
            data.find({user_name: request.name}, function(err, items) {

                const result = {
                    success: true,
                    message: '',
                    data: null
                };

                if (err) {
                    result.message = '服务器错误！';
                    result.success = false;
                } else {
                    items.toArray(function(err, item) {

                        if(item.length < 1) {
                            addUser(data, insertObj);
                            result.success = true;
                            result.message = '用户注册成功，请重新登录！';
                            res.send(result);
                        } else {
                            result.success = false;
                            result.message = '用户名已存在！';
                            res.send(result);

                        }
                    })
                }

            })
        })
    });
})


/*用户登录功能*/
app.get('/login', function(req, res){

    const response = {
        name: req.query.userName,
        password: req.query.password
    }

    MongoClient.connect("mongodb://localhost", function(err, db){

        const myDB = db.db("mean");

        myDB.collection("users", function(err, data){

            data.find({user_name: response.name}, function(err, items){

                const result = {
                    success: true,
                    message: '',
                    data: null
                };

                if(err){
                    result.message = '服务器错误！';
                    result.success = false;
                } else {
                    items.toArray(function(err, item){
                        console.log(item)
                        if (item.length < 1) {
                            result.success = false;
                            result.message = '用户名不存在！';
                            res.send(result)
                        } else {
                            if(response.password == item[0].user_pasd){
                                result.message = '登录成功！';
                                res.send(result)
                            } else {
                                result.message = '密码错误！';
                                result.success = false;
                                res.send(result)
                            }
                        }

                    })
                }
            })
        })
    })
})

const server = app.listen(8081);