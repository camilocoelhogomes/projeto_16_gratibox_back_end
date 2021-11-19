import express from 'express';
import cors from 'cors';
import signUp from './controller/signUp/signUp.js';
import signIn from './controller/signIn/signIn.js';
import validateToken from './middleware/validateToken.js';
import newSignature from './controller/newSignature/newSignature.js';
import validateAddress from './middleware/validateAddress.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/is-live', (req, res) => res.status(200).send({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
}));

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.post('/validate-token', validateToken, (req, res) => res.sendStatus(200));
app.post('/validate-address', validateToken, validateAddress, (req, res) => res.sendStatus(200));
app.post('/new-signature', validateToken, validateAddress, newSignature);

export default app;
