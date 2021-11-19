import jwt from 'jsonwebtoken';
import signatureDbFactory from '../../factoryes/dbFactoryes/signatureDbFactory.js';
import validateNewSignature from './validateNewSignature.js';

const newSignature = async (req, res) => {
  const userId = jwt.verify(req.headers?.authorization.split('Bearer ')[1], process.env.JWT_SECRET);
  const signature = req.body;
  const structureError = validateNewSignature({ signatureObject: signature });
  if (structureError) return res.status(400).send(structureError.details);
  try {
    await signatureDbFactory({ ...signature, userId: userId.id });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default newSignature;
