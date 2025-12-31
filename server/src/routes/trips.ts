
import express from 'express';
import { TRIPS } from '../data/mockData';

const router = express.Router();

// Get all trips
router.get('/', (req, res) => {
    res.json(TRIPS);
});

// Get trip by ID
router.get('/:id', (req, res) => {
    const trip = TRIPS.find(t => t.id === req.params.id);
    if (trip) {
        res.json(trip);
    } else {
        res.status(404).json({ message: 'Trip not found' });
    }
});

// Create a new trip (mock)
router.post('/', (req, res) => {
    const newTrip = req.body;
    newTrip.id = (TRIPS.length + 1).toString();
    TRIPS.push(newTrip);
    res.status(201).json(newTrip);
});

export default router;
