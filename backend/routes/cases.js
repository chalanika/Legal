var express = require('express');
var router = express.Router();
var Case = require('../models/case');

//search specific client
// router.get('/:id',async (req,res)=>{
//     console.log("dftyftdy");
//     console.log(req.params.id);
//     try{
//         const received = await Case.find({client_id: req.params.id});
//         console.log(received);
//         res.json(received);
//     }catch(error){
//         res.json({message: error});
//     }
// });

router.post('/', async (req,res)=>{
    const newCase = new Case({
        caseName :req.body.caseName,
        description:req.body.description,
        lawyer_id : req.body.lawyer_id,
        lawyerName : req.body.lawyerName,
        client_id : req.body.client_id,
        clientName : req.body.clientName,
        lawType : req.body.lawType,
        openedDate : req.body.openedDate,
        is_closed : req.body.is_closed,
        is_rated : req.body.is_rated
    });
    try{
        const saved = await newCase.save();
        res.json(saved);
    }catch(error){
        res.json({message:error});
    }  
});

router.get('/clients/:lawyerId', async (req,res)=>{
    console.log(req.params.lawyerId)
    try{
        received = await Case.find({lawyer_id:req.params.lawyerId});
        console.log(received);
        res.json(received);
    }catch(error){
        res.json({message:error});
    }
});

router.get('/ongoing/cases/:lawyerId',async (req,res)=>{
    try{
        received = await Case.find({lawyer_id:req.params.lawyerId, is_closed:false});
        res.json(received);
    }catch(error){
        res.json({message:error});
    }
})
//edit is_closed to true
router.patch('/:caseId',async (req,res)=>{
    console.log(req.body.is_closed);
    try{
        const patchCase = await Case.updateOne(
            {_id:req.params.caseId},
            {$set:{is_closed:req.body.is_closed}}
        )
        res.json(patchCase);
    }catch(error){
        res.json({message:error});
    }
})

router.get('/closed/cases/:lawyerId',async (req,res)=>{
    try{
        received = await Case.find({lawyer_id:req.params.lawyerId, is_closed:true});
        console.log(received);
        res.json(received);
    }catch(error){
        res.json({message:error});
    }
})

module.exports = router;