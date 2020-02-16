var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

router.get('/appointments/:id',async (req,res)=>{
    try {
        const appointments = await Appointment.find({ lawyerId: req.params.id });
        console.log('success')
        res.json(appointments);
      } catch (error) {
          console.log('error')
        res.json({ message: error });
      }
})

router.get('/clientAppointment/:id',async (req,res)=>{
  try {
    console.log(req.params.id);
    
      const clientappointments = await Appointment.find({ clientId: req.params.id });
      console.log('success client post');
      console.log(clientappointments);
      res.json(clientappointments);
    } catch (error) {
        console.log('error')
      res.json({ message: error });
    }
})


module.exports = router;