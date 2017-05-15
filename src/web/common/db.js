'use strict'

var log = require('debug')('db:'); 
var pool = require('./pool');

var insert = function(insert, fn){
    var sql = "INSERT INTO " + this.tableName + " ";

    var keysection = "(";
    var valsection = "(";

    for(var k in insert){
        keysection += k + ",";
        if(typeof(insert[k] === 'string')){
            insert[k] = pool.escape(insert[k]);
        }
        valsection += insert[k] + ","
    }

    keysection = keysection.substring(0, keysection.length -1) + ")";
    valsection = valsection.substring(0, valsection.length -1) + ")";

    sql += keysection + " VALUES " + valsection + ";";
    log(sql);

    pool.getConnection(function(err, conn){
        if(err){
            fn(err);
        }else{
            conn.query(sql, function(err, results){
                fn(err, results);
                conn.release();
            });
        }
    });

};

var update = function(query, fn){
    var update = query.update;
    var match = query.match || {};

    var sql = "UPDATE " + this.tableName  +" SET ";
    var updatesection = "";
    var matchsection = "";

    for(var k in update){
        if(typeof(update[k] === 'string')){
            update[k] = pool.escape(update[k]);
        }
        updatesection += k + "=" + update[k] + ",";
    }

    updatesection = updatesection.substring(0, updatesection.length - 1);
    sql += updatesection;

    for(var k in match){
        if(typeof(match[k]) === 'string'){
            match[k] = pool.escape(match[k]);
        }
        matchsection += k + "=" + match[k] + " AND ";
    }

    if(matchsection.length){
        sql += " WHERE " + matchsection.substring(0, matchsection.length - 5);
    }

    sql += ";";
    log(sql);
    pool.getConnection(function(err, conn){
        if(err){
            fn(err);
        }else{
            conn.query(sql, function(err, results){
                fn(err, results);
                conn.release();
            });
        }
    });
};

var remove = function(match, fn){
    var sql = "DELETE from " + this.tableName + "";
    var matchsection = "";
    
    for(var k in match){
        if(typeof(match[k]) === 'string'){
            match[k] = pool.escape(match[k]);
        }
        matchsection += k + "=" + match[k] + " AND ";
    }

    if(matchsection.length){
        sql += " WHERE " + matchsection.substring(0, matchsection.length - 5);
    }

    sql += ";";
    log(sql);
    pool.getConnection(function(err, conn){
        if(err){
            fn(err);
        }else{
            conn.query(sql, function(err, results){
                fn(err, results);
                conn.release();
            });
        }
    });
};

var select = function(query, fn){
    var select = query.select || {};
    var match = query.match || {};
    var limit = query.limit || {};

    var sql = "SELECT ";

    if(Object.keys(select).length == 0){
        sql += "*";
    }else{
        var selectsection = "";
        for(var k in select){
            if(select[k] == 1){
                selectsection += k + ",";
            }
        }
        selectsection = selectsection.substring(0, selectsection.length - 1);
        sql += selectsection;
    }

    sql += " FROM " + this.tableName;

    var matchsection = "";
    
    for(var k in match){
        if(typeof(match[k]) === 'string'){
            match[k] = pool.escape(match[k]);
        }
        matchsection += k + "=" + match[k] + " AND ";
    }

    if(matchsection.length){
        sql += " WHERE " + matchsection.substring(0, matchsection.length - 5);
    }

    sql += " ORDER BY `update_time`";

    if(typeof(limit.index) === 'number'){
        var index = limit.index;
        var count = (typeof(limit.count) === 'number') ? limit.count : 10;
        sql += " limit " + index + ", " + count;
    }

    sql += ";";
    log(sql);
    
    pool.getConnection(function(err, conn){
        if(err){
            fn(err);
        }else{
            conn.query(sql, function(err, rows){
                fn(err, rows);
                conn.release();
            });
        }
    });
};

var excute = function(sql, fn){
    log(sql);
    pool.getConnection(function(err, conn){
        if(err){
            fn(err);
        }else{
            conn.query(sql, function(err, rows){
                fn(err, rows);
                conn.release();
            });
        }
    });
}

var DB = function(options){
    this.tableName = options.tableName;
    this.insert = insert;
    this.update = update;
    this.remove = remove;
    this.select = select;
    this.excute = excute;
};

module.exports = DB;