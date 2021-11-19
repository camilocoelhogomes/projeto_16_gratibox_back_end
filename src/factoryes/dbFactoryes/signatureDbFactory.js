import connection from '../dbConfig.js';

const signatureDbFactory = ({
  userDeliveryDateId,
  userProductOptionsId,
  userId,
}) => connection.query(`
INSERT INTO
  signature (delivery_date_id,product_options_id,user_id)
VALUES
  ($1,$2,$3)`, [userDeliveryDateId,
  userProductOptionsId,
  userId]);

export default signatureDbFactory;
