import connection from '../dbConfig.js';

const plansDbFactory = () => connection.query('SELECT plans.id AS "plansId", plans.name AS "plansName" FROM plans;', []);

export default plansDbFactory;
