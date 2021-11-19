import jwt from 'jsonwebtoken';
import validateNewSignature from './validateNewSignature.js';

const newSignature = (req, res) => {
  const userId = jwt.verify(req.headers?.authorization.split('Bearer ')[1], process.env.JWT_SECRET);
  const signature = req.body;
  const structureError = validateNewSignature({ signatureObject: signature });

  console.log(structureError);
  try {
    return res.status(201).send(userId);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default newSignature;
