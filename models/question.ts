import { queries } from "../database.ts";
import { idGenerator } from "../utility/idGenerator.ts";

interface Answers {
    text: string[],
    isCorrect: boolean[]
}
interface Question {
    userID: string,
    question: string
    phaseNum: number,
    answers: Answers
}

export async function createQuestion({userID, phaseNum, answers}: Question): Promise<string> {
    switch (phaseNum)
    {
        case 1:
            
        case 2:
        case 3:
        case 4:
    }
    await queries('INSERT INTO "UGQuestion" VALUES($1, $2, $3, $4, $5)', [idGenerator(), userID, phaseNum, answers, new Date()]);
    return "Question created successfully.";
}

export async function getQuestion(): Promise<any> {
    const result: any = await queries('SELECT QuestionName, Options FROM "UGQuestion" ORDER BY RANDOM() LIMIT 1');
    return {
        "question": result.rows[0].QuestionName,
        "options": result.rows[0].Options
    }
}