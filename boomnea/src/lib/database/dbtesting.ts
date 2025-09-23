import { queries } from "../database/database.ts";

const result = await queries(`SELECT "UGQuestionID", "UserID", "PhaseNum", "QnCreatedAt", "Question", "Answers" FROM "UGQuestion" WHERE "UGQuestionID" = $1`, ["4h0HnIsF5M"]);


const list = {
    question: result["rows"][0]["Question"],
    questionId: result["rows"][0]["UGQuestionID"],
    phaseNumber: result["rows"][0]["PhaseNum"],
    createdBy: result["rows"][0]["UserID"],
    createdAt: result["rows"][0]["QnCreatedAt"],
    options: result["rows"][0]["Answers"]
};
console.log(list)