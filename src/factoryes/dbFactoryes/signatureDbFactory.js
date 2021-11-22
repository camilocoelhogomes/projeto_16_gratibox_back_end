import connection from '../dbConfig.js';

const signatureDbFactory = ({
  userDeliveryDateId,
  userId,
}) => connection.query(`
INSERT INTO
  signature (delivery_date_id,user_id)
VALUES
  ($1,$2)`, [userDeliveryDateId,
  userId]);

export default signatureDbFactory;
