import React from 'react'

export type QuestoinType = {
    category: string,
    type: string,
    diffuculty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}

export type QuizType = {
    question: string,
    answer: string,
    correct_answer: string,
    options: string[]
}

export type QuestionPropsType = {
    question: string,
    options: string[],
    callback: (e: React.FormEvent<EventTarget>, ans: string) => void
}

export type DataType={
    QuestionsNumber: number,
    Difficulty: string
}