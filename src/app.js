import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/is-live', (req, res) => res.sendStatus(200));

export default app;
