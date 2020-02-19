var express = require('express');
var router = express.Router();
var Case = require('../models/case');

router.post('/', async (req, res) => {
    const newCase = new Case({
        caseName: req.body.caseName,
        description: req.body.description,
        lawyer_id: req.body.lawyer_id,
        lawyerName: req.body.lawyerName,
        client_id: req.body.client_id,
        clientName: req.body.clientName,
        lawType: req.body.lawType,
        openedDate: req.body.openedDate,
        is_closed: req.body.is_closed,
        is_rated: req.body.is_rated
    });
    try {
        const saved = await newCase.save();
        res.json(saved);
    } catch (error) {
        res.json({ message: error });
    }
});
//get all clients
router.get('/clients/:lawyerId', async (req, res) => {
    console.log(req.params.lawyerId)
    try {
        received = await Case.find({ lawyer_id: req.params.lawyerId });
        res.json(received);
    } catch (error) {
        res.json({ message: error });
    }
});
//get ongoing cases of lawyer
router.get('/ongoing/cases/:lawyerId', async (req, res) => {
    try {
        received = await Case.find({ lawyer_id: req.params.lawyerId, is_closed: false });
        res.json(received);
    } catch (error) {
        res.json({ message: error });
    }
})
//get ongoing cases of client
router.get('/ongoing/cases/client/:clientId', async (req, res) => {
    try {
        received = await Case.find({ client_id: req.params.clientId, is_closed: false });
        res.json(received);
    } catch (error) {
        res.json({ message: error });
    }
})
//edit is_closed to true
router.put('/:caseId', async (req, res) => {
    try {
        const newCase = await Case.findById({ _id: req.params.caseId });
        newCase.caseName = req.body.caseName;
        newCase.description = req.body.description;
        newCase.lawyer_id = req.body.lawyer_id;
        newCase.lawyerName = req.body.lawyerName;
        newCase.client_id = req.body.client_id;
        newCase.clientName = req.body.clientName;
        newCase.lawType = req.body.lawType;
        newCase.openedDate = req.body.openedDate;
        newCase.closedDate = req.body.closedDate;
        newCase.is_closed = req.body.is_closed;
        newCase.is_rated = req.body.is_rated;
        const saved = await Case.findByIdAndUpdate(req.params.caseId, newCase, { new: true });
        res.json(saved);

    } catch (error) {
        res.json({ message: error });
    }
})
//get closed cases of lawyer
router.get('/closed/cases/:lawyerId', async (req, res) => {
    try {
        received = await Case.find({ lawyer_id: req.params.lawyerId, is_closed: true });
        res.json(received);
    } catch (error) {
        res.json({ message: error });
    }
})
//get closed cases of client
router.get('/closed/cases/client/:clientId', async (req, res) => {
    try {
        received = await Case.find({ client_id: req.params.clientId, is_closed: true });
        res.json(received);
    } catch (error) {
        res.json({ message: error });
    }
})
//get specific case
router.get('/id/:caseId', async (req, res) => {
    try {
        received = await Case.findById(req.params.caseId);
        res.json(received);

    } catch (error) {
        res.json({ message: error });
    }
})

//get specific client's case details
router.get('/client/:clientId', async (req, res) => {
    try {
        received = await Case.find({ client_id: req.params.clientId, is_closed: true, is_rated: false });
        res.json(received);
    } catch (error) {
        res.json({ message: error });
    }
})

//update is_rated to true
router.patch('/update/rate/:caseId', async (req, res) => {
    try {
        const patchCase = await Case.updateOne(
            { _id: req.params.caseId },
            { $set: { is_rated: req.body.is_rated } }
        )
        res.json(patchCase);
    } catch (error) {
        res.json({ message: error });
    }
})

router.get('/ongoing/lawyer/:lawyerId/client/:clientId' , async (req,res)=>{
    console.log(req.params.lawyerId);
    console.log(req.params.clientId);
    try{
        const result = await Case.find({lawyer_id:req.params.lawyerId,client_id:req.params.clientId,is_closed:false});
        res.json(result);
    }catch(error){
        console.log(error);
    }
})

router.get('/closed/lawyer/:lawyerId/client/:clientId' , async (req,res)=>{
    console.log(req.params.lawyerId);
    console.log(req.params.clientId);
    try{
        const received = await Case.find({lawyer_id:req.params.lawyerId,client_id:req.params.clientId,is_closed:true});
        res.json(received);
    }catch(error){
        console.log(error);
    }
})

module.exports = router;