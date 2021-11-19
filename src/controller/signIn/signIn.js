import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import signInFactory from '../../factoryes/dbFactoryes/signInFactory.js';
import validateSignIn from './validateSignIn.js';
import userWithSignatureDbFactory from '../../factoryes/dbFactoryes/userWithSignatureDbFactory.js';

const signIn = async (req, res) => {
  const user = req.body;

  const validateError = validateSignIn({ signInObject: user });
  if (validateError) return res.sendStatus(401);
  try {
    const dbUser = await signInFactory(user);
    if (!bcrypt.compareSync(user.userPassword, dbUser.rows[0].password)) return res.sendStatus(401);
    const userObject = {
      userName: dbUser.rows[0].name,
      userToken: jwt.sign({ id: dbUser.rows[0].id }, process.env.JWT_SECRET),
      userPlan: null,
      userPlanSignatureDate: null,
      userAddress: [],
    };
    const signature = await userWithSignatureDbFactory({ userId: dbUser.rows[0].id });
    console.log(signature);
    return res.status(200).send(userObject);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default signIn;
