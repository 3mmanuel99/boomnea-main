import express from "express";
import { queries } from "../database/database.ts";

const app = express()


app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Hello world! (I hope I can complete my coursework on time...)")
});


app.get("/api/getQuestions", async (_req: any, res: any ) => {
     // tablesample system returns a random sample from the table in postgres
    try {
        const result: any = await queries('SELECT "QuestionName", "PhaseNum", "CreatedBy", "Options" FROM "Questions" TABLESAMPLE SYSTEM (1) LIMIT 1')
        const list = {
            question: result[0]["rows"]["QuestionName"],
            phaseNumber: result[0]["rows"]["PhaseNum"],
            createdBy: result[0]["rows"]["CreatedBy"],
            options: result[0]["rows"]["Options"]
        };
        await res.send(list)
    } catch (err) 
    {
        res.status(500).send({
            "error": `Internal server error! (database error: ${err})`
        })
    }
})



app.listen(3000, () => {
    console.log("Now listening on port 3000!")
})
