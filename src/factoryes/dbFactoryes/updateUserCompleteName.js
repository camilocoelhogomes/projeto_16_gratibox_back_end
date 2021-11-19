import connection from '../dbConfig';

const updateUserCompleteName = ({ completeName, userId }) => connection.query(`
  UPDATE
    users
  SET
    complete_name = ($1)
  WHERE
    id = ($2);
`, [completeName, userId]);

export default updateUserCompleteName;
