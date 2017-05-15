'use strict'

var log = require('debug')('web:events:');
var router  =require('express').Router();
var db = new (require('../common/db'))({tableName:'tb_msg_info'});
var async = require('async');

router.get('/list',function(req,res,next){
    var options = req.query || {};
    var index = options.index || 0;
    var count = options.count || 10;

    var sql1 = "SELECT COUNT(*) FROM tb_msg_info INNER JOIN tb_user_info ON tb_msg_info.user_id=tb_user_info.id;";
    db.excute(sql1,function(err,rows){
        var total = rows[0]['COUNT(*)'];
        var sql = "SELECT tb_msg_info.id AS id, user_id, content,tb_msg_info.update_time as update_time, tb_user_info.name as username";
        sql += " FROM tb_msg_info INNER JOIN tb_user_info ON tb_msg_info.user_id=tb_user_info.id ";
        sql += "ORDER BY tb_msg_info.update_time DESC LIMIT " + (index * count) + ", " + count + ";";

        db.excute(sql, function(err, rows){
            var data = {
                success: !err,
                size: rows.length, 
                list:rows,
                total:parseInt(total),
                message: err ? err : ''
            };
            log(rows);
            res.send(data);
        });
    });
});


module.exports = router;