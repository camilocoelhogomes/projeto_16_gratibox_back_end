import pg from 'pg';

const { Pool } = pg;
let databaseConfig;
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  databaseConfig = {
    user: 'postgres',
    password: '123456',
    port: 5432,
    host: 'localhost',
    database: 'projeto_16_test',
  };
} else {
  databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
const connection = new Pool(databaseConfig);

export default connection;
