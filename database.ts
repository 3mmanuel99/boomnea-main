import { Pool } from "pg";
import dotenv from "dotenv";
import process from "node:process";
import path from "path";

// dotenv configuration
dotenv.config({
    override: true, // Overrides any environment variables that have already been set on the machine with values from the .env file.
    quiet: true // i keep getting these tips when running my code, so i enabled this to remove them
});

// postgres configuration
export const pool: Pool = new Pool({
    host: process.env.HOST, 
    port: parseInt(process.env.PORT || ""), // by default, env vars are strings, and since the port is an integer, it needs to be converted to such
    database: process.env.DATABASE, // database we are using
    user: process.env.USER, // user who owns said database
    password: process.env.PASSWORD // password used for the database
});

/* params text and values will be used when doing db ops
the text is the operation itself e.g SELECT FROM..., the
params are the values that are passed into said db op.
it is worth mentioning that doing operations like this
should NOT be prone to SQL injection

exporting this function means that we can use it anywhere
else within this codebase, which is crucial when we want
to do any sort of database operation
*/
export async function queries(text: string, values?: any[]) {
    /* asynchronous operations when dealing with databases
    is crucial as they avoid blocking a thread while a query
    is being executed, in essence, a process that runs inde-
    pendently from other processes
    */
    const client = await pool.connect();
    try {
        // the try block is we are trying to execute
        await client.query(text, values);
    } catch (error) { 
        // error handling: we are 'catching' exceptions generated within the try statement
        console.log(`An error occurred! ${error}`) 
    } finally {
        /* the finally statement defines a block to run regardless of execution,
        so this will run NO MATTER WHAT.
        */
        client.release(); 
        /* we release the client once we are done with it, 
        otherwise, the app will quickly exhaust idle, available
        clients in the pool and all further calls to pool.connect 
        will timeout with an error or hang indefinitely if we have 
        connectionTimeoutMillis configured to 0. this is the number
        of miliseconds a client must sit idle in the pool to not be
        checked out before it is disconnected from backend and discarded
        */
    }
}
