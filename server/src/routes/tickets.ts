
import express from 'express';
import { MOCK_TICKETS } from '../data/mockData';

const router = express.Router();

// Get all tickets
router.get('/', (req, res) => {
    res.json(MOCK_TICKETS);
});

// Resolve a ticket
router.post('/:id/resolve', (req, res) => {
    const ticket = MOCK_TICKETS.find(t => t.id === req.params.id);
    if (ticket) {
        ticket.status = 'RESOLVED';
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});

export default router;
