var express = require('express');
var router = express.Router();
var user = require('../models/adminuser');
/* GET users listing. */
router.post('/login', function(req, res, next) {
    user.login(req.body,function(err){
        if(err){
            res.send({success:false});
        }else{
            res.send({success:true,cid:req.body.username});
        }
    });
});

module.exports = router;
