'use strict'

var express = require('express');
var router = express.Router();
var log = require('debug')('web:mark:');
var db = new (require('../common/db'))({tableName:'tb_msg_info'});


router.get('/list', function(req, res, next){

    var options = req.query || {};
    var index = options.index || 0;
    var count = options.count || 10;
    var marked = options.marked || 0;

    var sql1 = "SELECT COUNT(*) AS total FROM tb_msg_info AS m";
    sql1 +=    " JOIN tb_user_info AS u ON m.user_id = u.id";
    sql1 +=    " JOIN tb_process_info AS p ON m.id = p.id";
    sql1 += " WHERE m.isprocessed=" + marked;

    db.excute(sql1,function(err,rows){
        var total = rows[0]['total'];
        
        var select = "";
        if(marked != 1){
            select = " m.id AS mid,m.content as content, u.name AS username, m.update_time as update_time ";
        }else{
            select = " p.* "    
        }
        
        var sql = "SELECT " + select + " FROM tb_msg_info AS m";
        sql +=    " JOIN tb_user_info AS u ON m.user_id = u.id";
        sql +=    " JOIN tb_process_info AS p ON m.id = p.id";
        sql += " WHERE m.isprocessed=" + marked;
        sql += " ORDER BY m.update_time DESC LIMIT " + (index * count) + ", " + count + ";";

        db.excute(sql, function(err,rows){
            var data = {
                success: !err,
                size:rows.length,
                list:rows,
                total:parseInt(total),
                message:err?err:''
            }
            log(data);
            res.send(data);
        });
    });
});

router.get('/mark',function(req, res, next){
    var params = req.query;
    log(params);
    if(!('id' in params)){return res.send({success:false, message:'No ID Field'});}
    
    var sql1 = "UPDATE tb_msg_info SET isprocessed=1 WHERE id=" + params.id + ";";
    db.excute(sql1, function(err, rows){
        if(err){return res.send({success:false, message:'mysql update err'});}
        var model = {
            trigger:1,
            when:1,
            where:1,
            who:1,
            whom:1,
            how:1
        };
        var upset = " status=1";
        for(var field in model){
            if(field in params){
                upset += " ,a." + field + "='" + params[field]+"'";
            }
        }
        var sql = "UPDATE tb_process_info AS a SET ";
        sql += upset;
        sql += " WHERE id=" + params.id + ";"
        log(sql);
        db.excute(sql, function(err, rows){
            if(err){return res.send({success:false, message:'mysql update err'});}
            return res.send({success:true, message:''});
        });
    });
});

module.exports = router;