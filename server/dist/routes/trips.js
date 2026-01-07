"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mockData_1 = require("../data/mockData");
const router = express_1.default.Router();
// Get all trips
router.get('/', (req, res) => {
    res.json(mockData_1.TRIPS);
});
// Get trip by ID
router.get('/:id', (req, res) => {
    const trip = mockData_1.TRIPS.find(t => t.id === req.params.id);
    if (trip) {
        res.json(trip);
    }
    else {
        res.status(404).json({ message: 'Trip not found' });
    }
});
// Create a new trip (mock)
router.post('/', (req, res) => {
    const newTrip = req.body;
    newTrip.id = (mockData_1.TRIPS.length + 1).toString();
    mockData_1.TRIPS.push(newTrip);
    res.status(201).json(newTrip);
});
exports.default = router;
