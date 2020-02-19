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
    status : req.body.status,
    isAlert: req.body.isAlert
  });
  try {
    const saved = await appointment.save();
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});
//get an appointment with isAlert == false for a  special client
router.get('/:id', async (req, res) => {
  try {
    console.log('isAlert=false');
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
    received.lawyerId = req.body.lawyerId;
    received.lawyerName = req.body.lawyerName;
    received.clientId = req.body.clientId;
    received.clientName = req.body.clientName;
    received.subject = req.body.subject;
    received.description = req.body.description;
    received.startDateTime = req.body.startDateTime;
    received.finishDateTime = req.body.finishDateTime;
    received.status = req.body.status;
    received.isAlert = req.body.isAlert;
    const saved = await Appointment.findByIdAndUpdate(req.params.id, received, { new: true });
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});
//get specific lawyers confirmed appointments
router.get('/confirmed/lawyers/:lawyerId', async (req, res) => {
  try {
    const received = await Appointment.find({ lawyerId: req.params.lawyerId , status:"Confirmed"});
    res.json(received);
  } catch (error) {
    res.json({ message: error });
  }
});
//get specific lawyers not confirmed appointments
router.get('/incoming/lawyers/:lawyerId', async (req, res) => {
  try {
    const received = await Appointment.find({ lawyerId: req.params.lawyerId , status:"Not Confirmed"});
    res.json(received);
  } catch (error) {
    res.json({ message: error });
  }
});

//get specific clients confirmed appointment
router.get('/confirmed/clients/:clientId', async (req, res) => {
  try {
    const received = await Appointment.find({ clientId: req.params.clientId ,
    status:"Confirmed"});
    res.json(received);
  } catch (error) {
    res.json({ message: error });
  }
});
//get specific clients rejected appointment
router.get('/rejected/clients/:clientId', async (req, res) => {
  try {
    const received = await Appointment.find({ clientId: req.params.clientId ,
    status:"Rejected"});
    res.json(received);
  } catch (error) {
    res.json({ message: error });
  }
});
//delete appointment
router.delete('/:id',async(req,res)=>{
  try{
    const removed = await Appointment.remove({_id: req.params.id})
    res.json(removed);
  }catch(error){
    res.json({message:error})
  }
});
//

module.exports = router;