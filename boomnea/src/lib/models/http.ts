// deno-lint-ignore-file no-explicit-any
import express from "express";
import { getQuestion } from "./question.ts";

const app = express();


app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Hello world! (I hope I can complete my coursework on time...)");
});

// GET api/question/:id
app.get("/api/question/:id", async (req: any, res: any) => {
    try {
        const idParams = req.params["id"];
        const questionQuery = await getQuestion(idParams);
        if (!questionQuery)
        {
            res.status(404).send({
                "error": "Question not found."
            });
        }
        res.send(questionQuery);
    } catch (err: any) 
    {
        res.status(500).send({
            "error": `Internal server error! (database error: ${err})`
        });
    }
})



app.listen(3000, () => {
    console.log("Now listening on port 3000!")
})
