import { Pool } from "pg";

const pool = new Pool({
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export { pool };
