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
      userAddress: null,
      completeName: null,
      productOption: null,
      deliveryDate: null,
    };
    const signature = await userWithSignatureDbFactory({ userId: dbUser.rows[0].id });
    if (signature.rowCount) {
      userObject.completeName = signature.rows[0].completeName;
      userObject.userPlanSignatureDate = signature.rows[0].userPlanSignatureDate;
      userObject.userPlan = signature.rows[0].userPlan;
      userObject.productOption = signature.rows.map((item) => item.productOption);
      userObject.deliveryDate = signature.rows[0].deliveryDate;
      userObject.userAddress = {
        cep: signature.rows[0].cep,
        street: signature.rows[0].street,
        neighborhood: signature.rows[0].neighborhood,
        number: signature.rows[0].number,
      };
    }
    return res.status(200).send(userObject);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default signIn;
