'use strict'

var log = require('debug')('web:mark:');
var db = new(require('../common/db'))({
    tableName: 'tb_msg_info'
});


var sql1 = "UPDATE tb_msg_info SET isprocessed=1 WHERE id=" + '4089534734064270' + ";";
db.excute(sql1, function(err, rows) {
    log(err);
    log(rows);
});