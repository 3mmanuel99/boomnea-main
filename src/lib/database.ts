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

// todo: randomise ids
function idGenerator()
{
    const captialLetters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const smallLetters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    
    var id = "";
}

(async () => {
    const client = await pool.connect();
    try {
        const {rows} = await client.query('SELECT * FROM "Users"');
        console.log(rows);
    } catch (error) {
        console.log(`An error occurred! ${error}`)
    } finally {
        client.release();
    }
})();