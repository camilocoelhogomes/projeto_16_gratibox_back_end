import connection from '../dbConfig.js';

const plansDbFactory = () => connection.query(`
  SELECT
    plans.id AS "plansId",
    plans.name AS "plansName",
    plans."plan_description" AS "plansDescription",
    plans."img_url" AS "plansImg"
  FROM
    plans;`, []);

export default plansDbFactory;
