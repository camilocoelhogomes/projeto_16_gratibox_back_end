import plansDbFactory from '../../factoryes/dbFactoryes/plansDbFactory';

const getPlans = async (req, res) => {
  try {
    const allPlans = await plansDbFactory();
    return res.status(200).send(allPlans.rows);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default getPlans;
