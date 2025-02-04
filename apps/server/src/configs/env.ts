import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  DB: process.env.DB,
  JWT_SECRET: process.env.JWT_SECRET,

  EMAIL: process.env.EMAIL,
  PASS: process.env.PASS,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET,

  NODE_ENV: process.env.NODE_ENV,
};
