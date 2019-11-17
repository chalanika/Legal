var express = require('express');
var router = express.Router();
var Case = require('../models/case');

//search specific client
router.get('/:id',async (req,res)=>{
    try{
        const received = await Case.findById(req.params.id);
        res.json(received);
    }catch(error) {
        res.json({message: error});
    }
});