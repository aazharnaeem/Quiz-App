// import React from 'react'
import { QuizType, QuestoinType } from './../Types/quizTypes'

const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)


export const quizdetails = async (NoOfQuestions: number, difficulty: string): Promise<QuizType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${NoOfQuestions}&difficulty=${difficulty}&type=multiple`)
    let { results } = await res.json()
    const quiz: QuizType[] = results.map((questionObj: QuestoinType) => {
        return {
            question: questionObj.question,
            correct_answer: questionObj.correct_answer,
            // options: questionObj.incorrect_answers.concat(questionObj.correct_answer) 
            options: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer)) 
        }
    })
    return quiz
}