var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

//insert an appointment
router.post('/',async (req,res)=>{
    console.log(req.body);
    const appointment =  new Appointment({
        lawyerId:req.body.lawyerId,
        clientId:req.body.clientId,
        subject:req.body.subject,
        description:req.body.description,
        startDateTime:req.body.startDateTime,
        finishDateTime:req.body.finishDateTime
      });
      try{ 
        const saved = await appointment.save();
        res.json(saved);
      }catch(error){
        res.json({message:error});
      } 
});

module.exports = router;