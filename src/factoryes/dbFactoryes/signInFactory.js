import connection from '../dbConfig.js';

const signInFactory = ({
  userEmail,
}) => connection.query(`
SELECT * FROM
  users
WHERE
  email=$1`, [userEmail]);

export default signInFactory;
