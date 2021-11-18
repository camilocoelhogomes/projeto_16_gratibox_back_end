import Joi from 'joi';

const validateSignUp = ({ signUpObject }) => Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().required().pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/),
  userConfirmPassword: Joi.string().required().valid(Joi.ref('userPassword')),
}).validate(signUpObject).error;

export default validateSignUp;
