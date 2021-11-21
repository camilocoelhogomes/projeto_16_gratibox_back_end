import getDbProductOptions from '../../factoryes/dbFactoryes/getDbProductOptions.js';
import signatureFormDbFactory from '../../factoryes/dbFactoryes/signatureFormDbFactory.js';

const getNewSignatureForm = async (req, res) => {
  try {
    const signatureForm = await signatureFormDbFactory();

    const signatureFormOutput = [];

    for (let i = 0; i < signatureForm.rowCount; i += 1) {
      if (!signatureFormOutput.some((item) => item.planId === signatureForm.rows[i].planId)) {
        signatureFormOutput.push({
          planId: signatureForm.rows[i].planId,
          planName: signatureForm.rows[i].planName,
          deliveryDateOptions: [
            {
              deliveryDateId: signatureForm.rows[i].deliveryDateId,
              deliveryDateName: signatureForm.rows[i].deliveryDateName,
            },
          ],
        });
      } else {
        signatureFormOutput.forEach((item) => (item.planId === signatureForm.rows[i].planId
          ? item.deliveryDateOptions.push({
            deliveryDateId: signatureForm.rows[i].deliveryDateId,
            deliveryDateName: signatureForm.rows[i].deliveryDateName,
          }) : ''));
      }
    }

    const productOptions = await getDbProductOptions();
    return res.status(200).send({
      signatureOptoins: signatureFormOutput,
      productOptions: productOptions.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export default getNewSignatureForm;
