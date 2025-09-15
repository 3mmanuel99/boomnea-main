import { queries } from "../database.ts";
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
    const result: any = await queries('SELECT QuestionName, Options FROM "UGQuestion" ORDER BY RANDOM() LIMIT 1');
    return {
        "question": result.rows[0].QuestionName,
        "options": result.rows[0].Options
    }
}