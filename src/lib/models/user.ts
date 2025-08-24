import { queries } from "$lib/database";

export interface User {
    userid: string,
    username: string,
    password?: string
};

