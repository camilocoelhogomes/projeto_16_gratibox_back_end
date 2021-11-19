import connection from '../dbConfig';

const userWithSignatureDbFactory = ({ userId }) => connection.query(`
SELECT * FROM
  users
WHERE
  users.id = ($1);
`, [userId]);

export default userWithSignatureDbFactory;
