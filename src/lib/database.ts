import { Pool, Client } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    override: true,
    path: path.join(__dirname, "db.env")
});

const pool = new Pool({
    host: process.env.HOST,
    port: parseInt(process.env.PORT || ""),
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

(async () => {
    const client = await pool.connect();

    try {
        const resp = client.query("SELECT current_user")
        console.log(resp)
    } catch (error) {
        console.log(`An error occurred! ${error}`)
    } finally {
        client.release();
    }
})();