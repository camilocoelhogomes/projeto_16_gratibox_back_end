import connection from '../dbConfig.js';

const getDbProductOptions = () => connection.query(`
SELECT * FROM product_options;
`, []);

export default getDbProductOptions;
