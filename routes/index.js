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
router.get('/:id', getSubscriber, async (req, res) => {
    res.json(res.subscriber);
})

// delete the subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({message: 'Deleted Subscriber'})
    } catch (error) {
        res.status(500).json({message: err.message});
    }
})

// update the subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.channel != null){
        res.subscriber.channel = req.body.channel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.status(200).json(updatedSubscriber);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// middleware to get the subscriber by id
async function getSubscriber(req, res, next){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            res.status(404).json({message: 'Cannot find the subscriber'});
        }
    } catch (error) {
        return res.status(500).json({message: err.message});
    }
    res.subscriber = subscriber;
    next();
}


module.exports = router;