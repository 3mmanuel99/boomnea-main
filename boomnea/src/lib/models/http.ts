import express from "express";
import { queries } from "../database/database.ts";

const app = express()


app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Hello world! (I hope I can complete my coursework on time...)")
});


app.get("/api/getQuestions", async (_req: any, res: any) => {
     // tablesample system returns a random sample from the table in postgres
    try {
        const result: any = await queries('SELECT * FROM "UGQuestion" LIMIT 1')
        const list = {
            question: result["rows"][0]["Question"],
            questionId: result["rows"][0]["UGQuestionID"],
            phaseNumber: result["rows"][0]["PhaseNum"],
            createdBy: result["rows"][0]["UserID"],
            createdAt: result["rows"][0]["QnCreatedAt"],
            options: result["rows"][0]["Answers"]
        };
        if (!result["rows"]) {
            res.status(404).send({
                "error": "Not Found"
            })
        }
        await res.send(list)
    } catch (err) 
    {
        console.error(err);
        res.status(500).send({
            "error": `Internal server error! (database error: ${err})`
        })
    }
})



app.listen(3000, () => {
    console.log("Now listening on port 3000!")
})