'use strict'

var log = require('debug')('web:adminuser:');
var db = new (require('../common/db'))({tableName:'tb_admin_user_info'});

var login = function(data, fn){
    var u = data.username || '';
    var p = data.password || '';
    if((!u) || (!p)){
        fn('Null fields');
    }else{
        var query = {
            select: {password:1},
            match: {id: u, password:p}
        };

        db.select(query, function(err,rows){
            if(err){
                log(err);
                fn(err);
            }else if(rows.length){
                fn(null)
            }else{
                fn('No record matched');
            }
        });
    }
};

exports.login = login;