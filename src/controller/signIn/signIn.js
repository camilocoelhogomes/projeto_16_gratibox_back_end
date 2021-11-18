import jwt from 'jsonwebtoken';
import signInFactory from '../../factoryes/dbFactoryes/signInFactory';

const signIn = async (req, res) => {
  const user = req.body;
  try {
    const dbUser = await signInFactory(user);
    const userObject = {
      userName: dbUser.rows[0].name,
      userToken: jwt.sign({ id: dbUser.rows[0].id }, process.env.JWT_SECRET),
    };
    return res.status(200).send(userObject);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default signIn;
