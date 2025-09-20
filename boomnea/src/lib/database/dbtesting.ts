import { queries } from "../database/database.ts";

const result: any = queries('SELECT * FROM "UGQuestion" LIMIT 1')

console.log(result)