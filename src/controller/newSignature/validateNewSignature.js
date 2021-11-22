import Joi from 'joi';

const validateNewSignature = ({ signatureObject }) => Joi.object({
  userDeliveryDateId: Joi.number().required(),
  userProductOptionsId: Joi.array().min(1).required(),
  userAddress: Joi.required(),
}).validate(signatureObject).error;

export default validateNewSignature;
