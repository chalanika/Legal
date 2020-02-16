var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

router.get('/appointments/:id',async (req,res)=>{
    try {
        const appointments = await Appointment.find({ lawyerId: req.params.id });
        console.log('')
        res.json(appointments);
      } catch (error) {
        res.json({ message: error });
      }
})


module.exports = router;