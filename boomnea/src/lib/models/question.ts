import { queries } from "../database/database.ts";
import { questionIdGenerator } from "../utility/idGeneration.ts";

const phaseNum = 1 | 2 | 3 | 4;

interface Options
{
    optionName: string,
    isCorrect: boolean
}

interface Question {
    userID: string,
    question: string
    options: string[]
}

export async function createQuestion({userID, question, options}: Question, phaseNumber: number, ): Promise<string> {
    if (phaseNumber != phaseNum)
    {
        throw new Error("Invalid phase number!");
    }
    await queries('INSERT INTO "UGQuestion" VALUES($1, $2, $3, $4, $5)', [questionIdGenerator(), userID, phaseNum, options, new Date()]);
    return "Question created successfully.";
}


export async function getQuestion(): Promise<any> {
    const result: any = await queries('SELECT "QuestionName", "PhaseNum", "CreatedBy", "Options" FROM "Questions" TABLESAMPLE SYSTEM (1) LIMIT 1')
    const list = {
        question: result[0]["rows"]["QuestionName"],
        phaseNumber: result[0]["rows"]["PhaseNum"],
        createdBy: result[0]["rows"]["CreatedBy"],
        options: result[0]["rows"]["Options"]
    };
    return list;
}