import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "postgres",
  password: "234Family!",
  host: "localhost",
  port: 5432,
  database: "hangmandb",
});

export default pool;
