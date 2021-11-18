import './setup.js';
import app from './app.js';

const port = Number(process.env.SERVER_PORT);

app.listen(port, () => {});
