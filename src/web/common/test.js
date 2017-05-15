'use strict'

var db = new (require('./db'))({tableName: 'tb_msg_info'});
var log = require('debug')('test:');

// db.insert({name:'付昌盛',id:'1552794167', password:'52902**Fcs'},function(err,results){
//     log(err);
//     log(results);       
// });
// var match = {
//         'id':'123456',
//         'name':'cn'
// }
// var query = {
//     update:{
//         name:'福产生',
//         password:'529'
//     },
//     match:match
// };

// db.update(query,function(err,results){
//     log(err);
//     log(results);
// });

// db.remove({},function(err, results){
//     log(err);
//     log(results);
// });

db.select({select:{'id':1},match:{},limit:{index:0, count:5}},function(err,rows){
    log(err);
    log(rows);
});