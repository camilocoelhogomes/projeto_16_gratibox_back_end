import connection from '../dbConfig.js';

const signUpFactory = ({
  userName,
  userEmail,
  userPassword,
}) => connection.query(`
INSERT INTO
  users (name,email,password)
VALUES
  ($1,$2,$3)`, [userName, userEmail, userPassword]);

export default signUpFactory;
