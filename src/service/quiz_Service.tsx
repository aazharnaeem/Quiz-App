// import React from 'react'
import {QuizType, QuestoinType} from './../Types/quizTypes'

const shuffle=(array: any[])=>{
    [...array].sort(()=>Math.random()-0.5)
}

export const quizdetails =async(NoOfQuestions: number, difficulty:string): Promise<QuizType[]>=>{
    const res = await fetch(`https://opentdb.com/api.php?amount=${NoOfQuestions}&difficulty=${difficulty}&type=multiple`)
    let {results} = await res.json()
    const quiz: QuizType[]= results.map((questions: QuestoinType)=>{
        return{
            question: questions.question,
            answer: questions.correct_answer,
            correct_answer : questions.correct_answer,
            options: shuffle(questions.incorrect_answers.concat(questions.correct_answer))
        }
    })
    return results
}