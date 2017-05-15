'use strict'

var express = require('express');
var router = express.Router();
var log = require('debug')('web:admin:');


router.get('/main',function(req,res,next){
    var cid = req.params.cid || '';
    log('cid = ' + cid);
    res.locals.user = {name:'付昌盛'};
    res.render('main');
});

router.get('/host',function(req,res,next){
    res.render('host');
});

router.get('/events',function(req,res,next){
    res.render('events');
});

router.get('/mark',function(req,res,next){
    res.render('mark');
});

router.get('/crf',function(req,res,next){
    res.render('crf');
});

router.get('/info',function(req,res,next){
    res.render('info');
});

module.exports = router;