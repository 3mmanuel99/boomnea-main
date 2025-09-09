import { queries } from "../database.ts";
import { questionIdGenerator } from "../utility/idGeneration.ts";


interface Question {
    userID: string,
    question: string
    phaseNum: number,
    options: string[]
}

export async function createQuestion({question, userID, phaseNum, options}: Question): Promise<string> {
    switch (phaseNum)
    {
        case 1:
            
        case 2:

        case 3:
            
        case 4:
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