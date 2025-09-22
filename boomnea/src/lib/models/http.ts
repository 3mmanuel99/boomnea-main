// deno-lint-ignore-file no-explicit-any
import express from "express";
import { getQuestion } from "./question.ts";

const app = express()


app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Hello world! (I hope I can complete my coursework on time...)")
});


app.get("/api/getQuestions/:id", async (req: any, res: any) => {
     // tablesample system returns a random sample from the table in postgres
    try {
        const params = req.params;
        await res.send(getQuestion(params))
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