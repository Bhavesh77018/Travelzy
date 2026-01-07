"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mockData_1 = require("../data/mockData");
const router = express_1.default.Router();
// Get all vendors
router.get('/', (req, res) => {
    res.json(mockData_1.MOCK_VENDORS);
});
// Verify a vendor
router.post('/:id/verify', (req, res) => {
    const vendor = mockData_1.MOCK_VENDORS.find(v => v.id === req.params.id);
    if (vendor) {
        vendor.isVerified = !vendor.isVerified;
        res.json(vendor);
    }
    else {
        res.status(404).json({ message: 'Vendor not found' });
    }
});
exports.default = router;
