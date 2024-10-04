import { pool } from "./db";

async function main() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT NOW()");
    console.log(result.rows[0].now);
    return new Response("Bun!");
  } catch (err) {
    return new Response("Broken!", { status: 500 });
  } finally {
    client.release();
  }
}

main();
