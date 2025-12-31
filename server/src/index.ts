
import express, { Express } from 'express';
import cors from 'cors';
import tripsRouter from './routes/trips';
import vendorsRouter from './routes/vendors';
import ticketsRouter from './routes/tickets';

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/trips', tripsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/tickets', ticketsRouter);

app.get('/', (req, res) => {
    res.send('Travelzy API is running!');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
