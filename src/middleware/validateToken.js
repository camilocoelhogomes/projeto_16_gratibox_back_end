import jwt from 'jsonwebtoken';
import connection from '../factoryes/dbConfig.js';

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split('Bearer ')[1];
    const id = jwt.verify(token, process.env.JWT_SECRET);
    const isUser = await connection.query('SELECT * FROM users WHERE id=($1)', [id.id]);
    if (!isUser.rowCount) return res.status(401).send({ errorMessage: 'Invalid Signature' });
    return next();
  } catch (error) {
    return res.status(401).send({ errorMessage: 'Invalid Signature' });
  }
};

export default validateToken;
