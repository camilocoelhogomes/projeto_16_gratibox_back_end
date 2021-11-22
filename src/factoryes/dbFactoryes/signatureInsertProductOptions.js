import connection from '../dbConfig';

const signatureInsertProductOptionsFactory = ({ userId, productIds }) => {
  let query = 'INSERT INTO "user_products" ("user_id","product_options_id") VALUES ';
  productIds.forEach((productId, key) => {
    query += `($1,$${key + 2})${key + 1 === productIds.length ? ';' : ','}`;
  });
  return connection.query(query, [userId, ...productIds]);
};

export default signatureInsertProductOptionsFactory;
