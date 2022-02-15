const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber');

// create the subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        channel: req.body.channel
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
// get all
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch(err){
        res.status(500).json({message: error.message})
    }
})

// get by id
// delete the subscriber
// update the subscriber

module.exports = router;