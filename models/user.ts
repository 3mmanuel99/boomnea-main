import { queries } from "../database.ts";
import {userIdGeneration} from "../utility/idGeneration.ts";


/* export is a declaration
that allows values to be 'exported'.
interfaces allows us to define the 
shape of an object and the specify
the properties and values of said 
object
*/
export interface User {
    username: string, // the username they have chosen to register with (of course it cannot be on the database already)
    password?: string, // a password for registered accounts. this is optional as temp account won't need this
}


// creates a user account
export async function createUser({username, password}: User): Promise<string> {
    await queries('INSERT INTO "User" VALUES ($1, $2, $3, $4)', [userIdGeneration(), username, password, new Date()]);
    return "User created successfully.";
}

// fetches only one user in specific
export async function getUser({username}: User): Promise<any>
{
    // avoiding issues like SQL injection by not hardcoding values into SQL statements
    // deno-lint-ignore no-explicit-any
    const result: any = await queries('SELECT * FROM "Users" WHERE Username = $1', [username]);
    if (result["rows"][0].length == 0) {
        return "No results found."; // a row length of 0 means that it's not in the database.
    } else {
        // returning all details of the user (except their password)
        return {
            "userid": result.rows[0].UserID,
            "username": result.rows[0].Username,
            "createdAt": result.rows[0].UserCreatedAt,
        }
    }
}

// deletes a user
export async function deleteUser({username, password}: User): Promise<string> {
    await queries('DELETE FROM "User" WHERE Username = $1 AND Password = $2 AND Password IS NOT NULL', [username, password]);
    return "User deleted successfully.";
}