import jwt from 'jsonwebtoken';
import Joi from 'joi';
import axios from 'axios';
import addressDbFactory from '../factoryes/dbFactoryes/addressDbFactory.js';

const validateAddressPattern = ({ addressObject }) => Joi.object({
  cep: Joi.string().length(8).required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  neighborhood: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
}).validate(addressObject).error;

const validateAddress = async (req, res, next) => {
  const userId = jwt.verify(req.headers?.authorization.split('Bearer ')[1], process.env.JWT_SECRET);
  const address = req.body?.userAddress;

  if (!address || validateAddressPattern({ addressObject: address })) return res.status(400).send({ errorMessage: 'Invalid Address' });

  try {
    await axios.get(`https://brasilapi.com.br/api/cep/v1/${address.cep}`);
    await addressDbFactory({ ...address, userId: userId.id });
    return next();
  } catch (error) {
    if (error.code === '23505') return res.status(409).send({ errorMessage: 'conflict address' });
    return res.status(500).send(error);
  }
};

export default validateAddress;
