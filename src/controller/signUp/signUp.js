import bcrypt from 'bcrypt';
import validateSignUp from './validateSignUp.js';
import signUpFactory from '../../factoryes/dbFactoryes/signUpFactory.js';

const signUp = async (req, res) => {
  const newUser = req.body;
  const validationError = validateSignUp({ signUpObject: newUser });

  if (validationError) return res.status(400).send(validationError.details);
  const cryptPassword = bcrypt.hashSync(newUser.userPassword, 10);

  try {
    await signUpFactory({ ...newUser, userPassword: cryptPassword });
    return res.status(201).send();
  } catch (error) {
    if (error.code === '23505') return res.status(409).send(error);
    return res.status(500).send(error);
  }
};

export default signUp;
