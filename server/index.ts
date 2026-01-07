
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Travelzy API Server is Running');
});

// Example Trip Route
app.get('/api/trips', (req, res) => {
    // In real app, fetch from DB
    res.json([
        { id: '1', title: 'Test Trip from Server', price: 999 }
    ]);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
