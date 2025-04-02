import express from 'express';
import cors from 'cors';

const app = express();
const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(express.json())
app.use(cors(corsOptions))
app.get('/health', (_, res) => {
    res.status(200).json({ message: 'Server is OK' })
})

export default app;
