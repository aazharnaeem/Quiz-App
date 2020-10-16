import React, { useState } from 'react'
import { QuestionPropsType } from './../Types/quizTypes'
import './../App.css'

export const QuestionBox: React.FC<QuestionPropsType> = ({ question, options, callback }) => {
    let [ans, Setans] = useState('')

    const HandleSubmit = (e: any) => {
        Setans(e.target.value);
    }
    return (
        <div className='Question-main'>
            <div className='questions-box'>
                <h3>{question.toUpperCase()}</h3>
            </div>
            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, ans)} className='Answer-List'>
                {
                    options.map((opt: string, ind: number) => {
                        return(
                            <div key={ind} className='options-main'>
                            <span>{ind+1}.</span>
                                <label>
                                    <input 
                                    type='radio'
                                    name='opt'
                                    required
                                    value={opt}
                                    checked={ans === opt}
                                    onChange={HandleSubmit}
                                    />
                                    <span className='opt'>{opt.toUpperCase()}</span>                                    
                                </label>

                            </div>
                        )

                    })
                }
                <span className='submit-btn'>
                <input type="submit" className="submit" value='Submit' />

                </span>
            </form>

        </div>
    )
}