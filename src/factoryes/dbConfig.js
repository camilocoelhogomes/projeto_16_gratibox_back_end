import pg from 'pg';

const { Pool } = pg;
let databaseConfig;
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  databaseConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
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
