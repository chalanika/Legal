var express = require('express');
var router = express.Router();
var Case = require('../models/case');

//search specific client
router.get('/:id',async (req,res)=>{
    console.log("dftyftdy");
    console.log(req.params.id);
    try{
        const received = await Case.find({client_id: req.params.id});
        console.log(received);
        res.json(received);
    }catch(error){
        res.json({message: error});
    }
});

// router.post('/', async (req,res)=>{
//     const cases = new Case({

//     });
// })
module.exports = router;