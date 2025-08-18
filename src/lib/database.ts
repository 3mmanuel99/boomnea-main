import { Pool, Client } from "pg";
import dotenv from "dotenv";
import path from "path";

// dotenv configurations
dotenv.config({
    override: true, // Overrides any environment variables that have already been set on the machine with values from the .env file.
    path: path.join(__dirname, "db.env"), // Specifies a custom path if the file containing environment variables is located elsewhere. Can also be an array of strings, specifying multiple paths.
    quiet: true // i keep getting these tips when running my code, so i enabled this to remove them
});

// configuring postgres 
const pool: Pool = new Pool({
    host: process.env.HOST, 
    port: parseInt(process.env.PORT || ""),
    database: process.env.DATABASE, // database we are using
    user: process.env.USER, // user who owns said database
    password: process.env.PASSWORD // password used for the database
});

function idGenerator()
{
    // type annotations are used in typescript, which facilitates type checking by the compiler
    const combination: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
 
    var id: string = ""; // this variable will contain the id
    for (let i = 0; i < 10; i++)
    {
        id += "".concat(combination[Math.floor(Math.random() * combination.length)]); // chooses a random number from 0 to 61 which determines the position in the array
    }
    return id;
}

console.log(idGenerator());

/*
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
*/