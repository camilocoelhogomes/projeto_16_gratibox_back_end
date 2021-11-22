import connection from '../dbConfig.js';

const signatureFormDbFactory = () => connection.query(`
SELECT
  plans.id AS "planId",
  plans.name AS "planName",
  delivery_date.id AS "deliveryDateId",
  delivery_date.name AS "deliveryDateName"
FROM
  plans
JOIN
  delivery_date
ON
  delivery_date."plan_id" = plans."id";
`, []);

export default signatureFormDbFactory;
