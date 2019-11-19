const express = require('express');
const router = express.Router();
const url = require('url');
const dbConfig = require('../db/dbConfig.js');
const mysql = require('mysql');
const pool = mysql.createPool(dbConfig.mysql);
/* 登录接口 */
router.get('/login', function(req, res, next) {
    // 获取url中参数集合
    var params = url.parse(req.url, true).query;
    // sql查询语句
    var userSQL = "select * from USER where username = " + params.user;
    var SQL = "select * from USER where username = " + params.user + " and userpwd = " + params.pwd;
    // 启用连接池查询
    pool.getConnection(function(err, connection) {
        // 查询用户名是否存在
        connection.query(userSQL, function(err, results) {
            // 查询结果
            if (results != [] && results != "") {
                // 查询用户名密码是否正确
                connection.query(SQL, function(err, result) {
                    // 查询结果
                    if (result == undefined || result == "undefined") {
                        res.send({ "success": false, "data": {}, "msg": "接口地址错误" });
                    }
                    if (result.length == 1) {
                        res.send({ "success": true, "data": {}, "msg": "登录成功" });
                        alert("登录成功！！");
                    } else {
                        res.send({ "success": false, "data": {}, "msg": "用户名或密码错误" });
                    }

                });
                connection.release();
            } else {
                res.send({ "success": false, "data": {}, "msg": "用户名不存在" });
            }

        });
    })
});
module.exports = router;
