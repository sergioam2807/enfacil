const pg = require("pg");

export async function getUserDataPG() {
  const client = new pg.Client({
    connectionString: "postgres://postgres:admin@192.168.0.8:5432/Stock-Test",
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM "Personnel"');
    const data = result.rows;
    await client.end();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch users" };
  }
}
