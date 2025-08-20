import { Pool, Client } from "pg";
import dotenv from "dotenv";
import path from "path";

// dotenv configuration
dotenv.config({
    override: true, // Overrides any environment variables that have already been set on the machine with values from the .env file.
    path: path.join(__dirname, "db.env"), // Specifies a custom path if the file containing environment variables is located elsewhere. Can also be an array of strings, specifying multiple paths.
    quiet: true // i keep getting these tips when running my code, so i enabled this to remove them
});

// postgres configuration
const pool: Pool = new Pool({
    host: process.env.HOST, 
    port: parseInt(process.env.PORT || ""), // by default, env vars are strings, and since the port is an integer, it needs to be converted to such
    database: process.env.DATABASE, // database we are using
    user: process.env.USER, // user who owns said database
    password: process.env.PASSWORD // password used for the database
});

export async function queries(text: string, values?: any[]) {
    const client = await pool.connect();
    try {
        await client.query(text, values);
    } catch (error) {
        console.log(`An error occurred! ${error}`)
    } finally {
        client.release();
    }
}