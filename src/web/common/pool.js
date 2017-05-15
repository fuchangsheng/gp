'use strict'

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '52902**Fcs',
    database: 'wb_crf'
});

module.exports = pool;