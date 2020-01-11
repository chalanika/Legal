var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

//insert an appointment
router.post('/', async (req, res) => {
  console.log(req.body);
  const appointment = new Appointment({
    lawyerId: req.body.lawyerId,
    lawyerName: req.body.lawyerName,
    clientId: req.body.clientId,
    clientName: req.body.clientName,
    subject: req.body.subject,
    description: req.body.description,
    startDateTime: req.body.startDateTime,
    finishDateTime: req.body.finishDateTime,
    isAccepted: req.body.isAccepted,
    isRejected:req.body.isRejected,
    isAlert: req.body.isAlert
  });
  try {
    const saved = await appointment.save();
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});
//get an appointment with isAlert == false and special client
router.get('/:id', async (req, res) => {
  try {
    console.log('ertyuiokpl;');
    const received = await Appointment.find({ clientId: req.params.id, isAlert: false });
    res.json(received);
  } catch (error) {
    res.json({ message: error });
  }
});
//edit appointment
router.put('/:id', async (req, res) => {
  try {
    const received = await Appointment.findById({ _id: req.params.id });
    received.lawyerId = req.body.lawyerId,
    received.lawyerName = req.body.lawyerName,
    received.clientId = req.body.clientId,
    received.clientName = req.body.clientName,
    received.subject = req.body.subject,
    received.description = req.body.description,
    received.startDateTime = req.body.startDateTime,
    received.finishDateTime = req.body.finishDateTime,
    received.isAccepted = req.body.isAccepted,
    received.isRejected = req.body.isRejected,
    received.isAlert = req.body.isAlert
    const saved = await Appointment.findByIdAndUpdate(req.params.id, received, { new: true });
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});
//get specific lawyers appointments
router.get('/lawyers/:lawyerId', async (req, res) => {
  try {
    const received = await Appointment.find({ lawyerId: req.params.lawyerId });
    res.json(received);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/:id',async(req,res)=>{
  try{
    const removed = await Appointment.remove({_id: req.params.id})
    res.json(removed);
  }catch(error){
    res.json({message:error})
  }
});


module.exports = router;