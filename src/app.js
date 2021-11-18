import express from 'express';
import cors from 'cors';
import signUp from './controller/signUp/signUp.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/is-live', (req, res) => res.sendStatus(200));

app.post('/sign-up', signUp);
export default app;
