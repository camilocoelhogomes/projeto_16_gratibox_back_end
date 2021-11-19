import connection from '../dbConfig.js';

const addressDbFactory = ({
  cep,
  street,
  neighborhood,
  number,
  userId,
}) => connection.query(`
INSERT INTO
  address (zip_code,street,street_number,neighborhood,user_id)
VALUES
  ($1,$2,$3,$4,$5)`, [cep, street, number, neighborhood, userId]);

export default addressDbFactory;
