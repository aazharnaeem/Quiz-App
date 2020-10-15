import React, { useEffect, useState } from 'react';
import './App.css';
import { quizdetails } from './service/quiz_Service'
import { QuizType, DataType } from './Types/quizTypes'
import { QuestionBox } from './component/QuestionsBox'

function App() {
  let [quiz, setQuiz] = useState<QuizType[]>([])
  let [current, setcurrent] = useState(0)
  let [score, Setscore] = useState(0)
  let [result, Setresult] = useState(false)

  let [data, Setdata] = useState<DataType>({
    // QuestionsNumber: 0,
    Difficulty: ''
  })


  useEffect(() => {
    async function fetchData() {
      const questions: QuizType[] = await quizdetails(5, `${data.Difficulty}`)
      // console.log(question)
      setQuiz(
        questions
      )
    }
    fetchData()
  }, [data])
  // console.log(quiz)

  if (!quiz.length)
    return <h3>Loading...</h3>



  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuizType = quiz[current];

    if (userAns === currentQuestion.correct_answer) {
      Setscore(++score)
    }

    if (current !== quiz.length - 1)
      setcurrent(++current);
    else {
      Setresult(true)
    }
  }
  if (result) {
    return (<div className='result-container'>
      <h2>Result</h2>

      <p className="result-text">
        You final score is
            <b> {score}</b> out of <b>{quiz.length}</b>
      </p>
    </div>)
  }
  const ChanegDifficulty = (e: any) => {
    // console.l og(e.target.value)
    Setdata({
      ...data,
      Difficulty: e.target.value
    })
  }
  // const ChangeNumber=(e: any)=>{
  //   console.log(e.target.value)
  //   Setdata({
  //     ...data,
  //     QuestionsNumber : e.target.value
  //   })
  // }
  // console.log(data.Difficulty)
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Quiz App</h1>
      <div className='select-box'>
        SELECT DIFFICULTI <select onChange={ChanegDifficulty}>
          <option value='easy' >easy</option>
          <option value='medium'>medium</option>
          <option value='hard'>hard</option>
        </select>
        {/* <div>
          Enter No. of Questions <input type='number' size={4} value={data.QuestionsNumber} onChange={ChangeNumber}  />
        </div> */}
      </div>
      <QuestionBox
        options={quiz[current].options}
        question={quiz[current].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
