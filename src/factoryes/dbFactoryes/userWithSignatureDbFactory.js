import connection from '../dbConfig.js';

const userWithSignatureDbFactory = ({ userId }) => connection.query(`
SELECT 
  users.complete_name AS "completeName",
  address."zip_code" AS "cep",
  address."street" AS "street",
  address."neighborhood" AS "neighborhood",
  address."street_number" AS "number",
  signature."signature_date" AS "userPlanSignatureDate",
  plans."name" AS "userPlan",
  product_options."name" as "productOption",
  delivery_date."name" as "deliveryDate"
FROM
  users
JOIN
  address
ON
  users."id" = address."user_id"
JOIN
  signature
ON
  users."id" = signature."user_id"
JOIN
  delivery_date
ON
  signature."delivery_date_id" = delivery_date."id"
JOIN
  plans
ON
  delivery_date."plan_id" = plans."id"
JOIN
  product_options
ON
  signature."product_options_id" = product_options."id"
WHERE
  users.id = ($1);
`, [userId]);

export default userWithSignatureDbFactory;
