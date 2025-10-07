import { queries } from "../database/database.ts";
import { questionIdGenerator } from "../utility/idGeneration.ts";


interface Question {
    question: string
    questionID: string,
    createdByUserID: string,
    phaseNum: number,
    createdAt: number,
    options: object
}

// GET api/question/:questionID
export async function getQuestion(questionID: Question): Promise<object | undefined> {
    const result = await queries(`
        SELECT 
        "UGQuestionID", 
        "UserID", 
        "PhaseNum", 
        "QnCreatedAt", 
        "Question", 
        "Answers" 
        FROM "UGQuestion" 
        WHERE "UGQuestionID" = $1`, [questionID]);
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

// POST api/question/:userID 
// todo: continue this...
export async function createQUestion(attributes: Question) {
    // ** attributes.createdByUserID 
    // ** is passed twice as we 
    // ** need to check whether the 
    // ** user exists on the Users table.
    const result = await queries(`
        IF EXISTS (SELECT UserID FROM Users WHERE UserID = $1) BEGIN
        INSERT INTO
        "UGQuestion"
        VALUES
        ($2, $3, $4, $5, $6, $7)
        END
        `, [attributes.createdByUserID, 
            attributes.createdByUserID, 
            attributes.phaseNum, 
            attributes.createdAt, 
            attributes.question, 
            attributes.options]
        )
}