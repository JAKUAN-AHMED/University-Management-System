import dotenv from 'dotenv';
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
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
  super_admin_pass:process.env.SUPER_ADMIN_PASSWORD,
  admin_email:process.env.ADMIN_EMAIL,
  app_pass:process.env.APP_PASSWORD
};
