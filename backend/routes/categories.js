var express = require('express');
var router = express.Router();
var Category = require('../models/category');

// create category
router.post('/', async (req, res) => {
  const category = new Category({
      name: req.body.name,
      description: req.body.description,
      lawyerCount: 0
  });
  console.log(category);
  try {
      const saved = await category.save();
      res.json(saved);
  } catch (error) {
      res.json({ message: error });
  }
});

// get all categories
router.get('/', async (req, res) => {
  try {
      const received = await Category.find();
      res.json(received);
  } catch (error) {
      res.json({ message: error });
  }
});

// get specific category
router.get('/:id', async (req, res) => {
    try{
        const received = await Category.findById({_id: req.params.id});
        res.json(received);
    } catch(error) {
        res.json({message: error});
    }
});

// edit category
router.put('/:id', async (req, res) => {
    try{
        const received = await Category.findById({_id: req.params.id});
        received.name=req.body.name;
        received.description=req.body.description;
        const saved = await Category.findByIdAndUpdate(req.params.id, received, { new: true });
        res.json(saved);
    } catch(error) {
        res.json({message: error});
    }
});

// delete category
router.delete('/:id', async (req, res) => {
    try{
        const removed = await Category.remove({_id: req.params.id})
        res.json(removed);
    } catch(error) {
        res.json({message: error});
    }
});

module.exports = router;
