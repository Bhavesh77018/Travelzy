"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mockData_1 = require("../data/mockData");
const router = express_1.default.Router();
// Get all tickets
router.get('/', (req, res) => {
    res.json(mockData_1.MOCK_TICKETS);
});
// Resolve a ticket
router.post('/:id/resolve', (req, res) => {
    const ticket = mockData_1.MOCK_TICKETS.find(t => t.id === req.params.id);
    if (ticket) {
        ticket.status = 'RESOLVED';
        res.json(ticket);
    }
    else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});
exports.default = router;
