import { queries } from "../database";

/* export is a declaration
that allows values to be 'exported'.
interfaces allows us to define the 
shape of an object and the specify
the properties and values of said 
object
*/
export interface User {
    userID: string, // a unique, 10 character ID for the user
    username: string, // the username they have chosen to register with (of course it cannot be on the database already)
    password?: string, // a password for registered accounts. this is optional as temp account won't need this
    isTemporaryAccount: boolean, // a boolean value to see whether an account is temporary or not
    userCreatedAt: Date // the date and time the user was created
};

// fetches all the registered users
// Promise represents the completion of an asynchronous function
async function getUsers(): Promise<User[] | void> {
    /* queries is the function in database.ts
        where we execute SQL statements. we are able
        to use that function in this file because it
        has been 'exported'
    */
    const result = await queries("SELECT * FROM Users WHERE IsTemporaryAccount = false"); 
    /* ^^ we only want accounts that are registered because temporary 
    accounts will be deleted from the database anyway
    */
    return result; // returning results gotten
}

// fetches only one user in specific
async function getUser(user: User): Promise<void>
{
    // avoiding issues like SQL injection by not hardcoding values into SQL statements
    const result = await queries("SELECT * FROM Users WHERE Username = $1", [user.username]);
    // if no results...? (WIP)
    return result; // returning results gotten
}

// ...


