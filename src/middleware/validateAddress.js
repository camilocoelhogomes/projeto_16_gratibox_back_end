import Joi from 'joi';
import axios from 'axios';

const validateAddressPattern = ({ addressObject }) => Joi.object({
  completeName: Joi.string().required(),
  cep: Joi.string().length(8).required(),
  neighborhood: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  service: Joi.string(),
}).validate(addressObject).error;

const validateAddress = async (req, res, next) => {
  const address = req.body?.userAddress;
  if (!address || validateAddressPattern({ addressObject: address })) return res.status(400).send({ errorMessage: 'Invalid Address' });
  try {
    await axios.get(`https://brasilapi.com.br/api/cep/v1/${address.cep}`);
    return next();
  } catch (error) {
    if (error.code === '23505') return res.status(409).send({ errorMessage: 'conflict address' });
    return res.status(500).send(error);
  }
};

export default validateAddress;
