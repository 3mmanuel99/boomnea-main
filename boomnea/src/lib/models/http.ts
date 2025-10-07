// deno-lint-ignore-file no-explicit-any
import express from "express";
import { createQUestion, getQuestion } from "./question.ts";

const app = express();


app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Hello world! (I hope I can complete my coursework on time...)");
});

// GET api/question/:questionID
app.get("/api/question/:questionID", async (req: any, res: any) => {
    try {
        const questionIDParam = req.params["questionID"];
        const getQuestionQuery = await getQuestion(questionIDParam);
        if (!getQuestionQuery)
        {
            res.status(404).send({
                "error": "Question not found."
            });
        }
        res.send(getQuestionQuery);
    } catch (err: any) 
    {
        res.status(500).send({
            "error": `Internal server error! (database error: ${err})`
        });
    }
})
// todo: POST api/question/...
app.post("api/question/:userID", async (req: any, res: any) => {
    try {
        const userIDParam = req.params["userID"];
        const createQuestionQUery = await createQUestion(userIDParam);
        // ...
    } catch {
        // ...
    }
})


app.listen(3000, () => {
    console.log("Now listening on port 3000!")
})
