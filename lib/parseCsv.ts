import Papa from 'papaparse'
import Question from '../types'

type RawQuestion = {
    question: string
    answers: string
    correctAnswer: string
}
export async function parseCsv(path: string): Promise<Question[]> {
    const response = await fetch(path);
    const csvString = await response.text();
    const { data } = Papa.parse<RawQuestion>(csvString, { header: true });
    return data.map(({ question, answers, correctAnswer }) => ({
        question,
        answers: answers.split('|'),
        correctAnswer: correctAnswer.split('|').map((answer) => parseInt(answer))
    }));
}