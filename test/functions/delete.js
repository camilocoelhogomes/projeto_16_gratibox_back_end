import connection from '../../src/factoryes/dbConfig';

const deleteDb = connection.query(`
  DELETE FROM user_products;
  DELETE FROM signature;
  DELETE FROM address;
  DELETE FROM users;
`);

export default deleteDb;
