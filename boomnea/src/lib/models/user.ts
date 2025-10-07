import { queries } from "../database/database.ts";
import {userIdGeneration} from "../utility/idGeneration.ts";

// creates a user account
export async function createUser(username: string, password: string): Promise<string> {
    // todo: use hashing algorithm for passwords so they can be stored safely (WIP)
    // ...
    await queries(`
        INSERT INTO 
        "User" 
        (UserID, Username, Password, CreatedAt) 
        VALUES ($1, $2, $3, $4)`, 
        [userIdGeneration(), username, password, Date.now()]);
    return "User created successfully.";
}

// fetches only one user in specific
export async function getUser(username: string): Promise<object | undefined>
{
    // ** avoiding issues like SQL injection by not hardcoding values into SQL statements is important
    // todo: change 'SELECT *' to the columns you ACTUALLY need info from
    // deno-lint-ignore no-explicit-any
    const result: any = await queries('SELECT * FROM "User" WHERE Username = $1', [username]);
    const list = {
        "userid": result.rows[0].UserID,
        "username": result.rows[0].Username,
        "createdAt": result.rows[0].UserCreatedAt
    };
    if (result.rows.length > 0) {
        return list;
    } else {
        null;
    }
}

// deletes a REGISTERED user
export async function deleteUser(username: string, password: string): Promise<string | undefined> {
    await queries('DELETE FROM "User" WHERE Username = $1 AND Password = $2 AND Password IS NOT NULL', [username, password]);
    return "User deleted successfully.";
}