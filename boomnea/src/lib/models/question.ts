import { queries } from "../database/database.ts";
import { questionIdGenerator } from "../utility/idGeneration.ts";

/*
export async function createQuestion({userID, question, options}: Question, phaseNumber: number, ): Promise<string> {
    if (phaseNumber != phaseNum)
    {
        throw new Error("Invalid phase number!");
    }
    await queries('INSERT INTO "UGQuestion" VALUES($1, $2, $3, $4, $5)', [questionIdGenerator(), userID, phaseNum, options, new Date()]);
    return "Question created successfully.";
}
*/

// GET api/question/:id
export async function getQuestion(id: string): Promise<object | undefined> {
    const result = await queries(`
        SELECT 
        "UGQuestionID", 
        "UserID", 
        "PhaseNum", 
        "QnCreatedAt", 
        "Question", 
        "Answers" 
        FROM "UGQuestion" 
        WHERE "UGQuestionID" = $1`, [id]);
    if (result.rows.length > 0) {
        const list = {
            question: result["rows"][0]["Question"],
            questionId: result["rows"][0]["UGQuestionID"],
            phaseNumber: result["rows"][0]["PhaseNum"],
            createdBy: result["rows"][0]["UserID"],
            createdAt: result["rows"][0]["QnCreatedAt"],
            options: result["rows"][0]["Answers"]
        };
        return list;
    } else {
        null; // ** this makes the api return an error 404 should return.rows.length equal 0.
    }
}