import dotenv from 'dotenv';
import { access } from 'fs';
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  brcypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  default_pass: process.env.DEFAULT_PASS,
  access_token_secret: process.env.JWT_ACCESS_SECRET,
  // refresh_token_secret:process.env.JWT_REFRESH_SECRET,
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
