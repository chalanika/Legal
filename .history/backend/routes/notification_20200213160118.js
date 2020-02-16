var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

router.get('/appointments/:id',(req,res)=>{
    try {
        console.log('ertyuiokpl;');
        const appointments = await Appointment.find({ lawyerId: req.params.id, isAlert: false });
        res.json(appointments);
      } catch (error) {
        res.json({ message: error });
      }
})


module.exports = router;