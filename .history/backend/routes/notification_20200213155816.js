var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

router.get('/appointme',(req,res)=>{
    res.send('hello');
})


module.exports = router;