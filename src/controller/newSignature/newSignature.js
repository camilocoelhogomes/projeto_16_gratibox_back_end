import jwt from 'jsonwebtoken';
import signatureDbFactory from '../../factoryes/dbFactoryes/signatureDbFactory.js';
import signatureInsertProductOptionsFactory from '../../factoryes/dbFactoryes/signatureInsertProductOptionsFactory.js';
import validateNewSignature from './validateNewSignature.js';
import userWithSignatureDbFactory from '../../factoryes/dbFactoryes/userWithSignatureDbFactory.js';
import addressDbFactory from '../../factoryes/dbFactoryes/addressDbFactory.js';
import updateUserCompleteName from '../../factoryes/dbFactoryes/updateUserCompleteName.js';

const newSignature = async (req, res) => {
  const userId = jwt.verify(req.headers?.authorization.split('Bearer ')[1], process.env.JWT_SECRET);
  const signature = req.body;

  const structureError = validateNewSignature({ signatureObject: signature });
  if (structureError) return res.status(400).send(structureError.details);
  const userObject = {};
  try {
    await signatureDbFactory({ ...signature, userId: userId.id });
    await signatureInsertProductOptionsFactory({
      userId: userId.id,
      productIds: signature.userProductOptionsId,
    });
    await addressDbFactory({
      cep: signature.userAddress.cep,
      street: signature.userAddress.street,
      neighborhood: signature.userAddress.neighborhood,
      number: signature.userAddress.number,
      userId: userId.id,
    });
    await updateUserCompleteName({
      completeName: signature.userAddress.completeName,
      userId: userId.id,
    });
    const signatureData = await userWithSignatureDbFactory({ userId: userId.id });
    if (signatureData.rowCount) {
      userObject.completeName = signatureData.rows[0].completeName;
      userObject.userName = signatureData.rows[0].name;
      userObject.userPlanSignatureDate = signatureData.rows[0].userPlanSignatureDate;
      userObject.userPlan = signatureData.rows[0].userPlan;
      userObject.productOption = signatureData.rows.map((item) => item.productOption);
      userObject.deliveryDate = signatureData.rows[0].deliveryDate;
      userObject.userAddress = {
        cep: signatureData.rows[0].cep,
        street: signatureData.rows[0].street,
        neighborhood: signatureData.rows[0].neighborhood,
        number: signatureData.rows[0].number,
      };
    }
    return res.status(201).send(userObject);
  } catch (error) {
    if (error.code === '23505') return res.status(409).send({ errorMessage: 'conflict signature' });
    return res.status(500).send(error);
  }
};

export default newSignature;
