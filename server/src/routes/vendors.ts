
import express from 'express';
import { MOCK_VENDORS } from '../data/mockData';

const router = express.Router();

// Get all vendors
router.get('/', (req, res) => {
    res.json(MOCK_VENDORS);
});

// Verify a vendor
router.post('/:id/verify', (req, res) => {
    const vendor = MOCK_VENDORS.find(v => v.id === req.params.id);
    if (vendor) {
        vendor.isVerified = !vendor.isVerified;
        res.json(vendor);
    } else {
        res.status(404).json({ message: 'Vendor not found' });
    }
});

export default router;
