import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test';

dotenv.config({
  path: envFile,
});
