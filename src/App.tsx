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

  let [data, setData] = useState<DataType>({
    QuestionsNumber: 5,
    Difficulty: ''
  })


  useEffect(() => {
    async function fetchData() {
      const questions: QuizType[] = await quizdetails(data.QuestionsNumber, `${data.Difficulty}`)
      if (data.QuestionsNumber <= 0)
        return

      setQuiz(
        questions
      )
    }
    fetchData()
  }, [data])

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
  const Reload = () => {
    window.location.reload()
  }
  if (result) {
    return (
      <div className='result-container'>
        <button className='submit' onClick={Reload} >Restart</button>

        <h2>Result</h2>

        <p className="result-text">
          You final score is
            <b> {score}</b> out of <b>{quiz.length}</b>
        </p>
      </div>)
  }
  const ChangeNumber = (e: any) => {
    setData({
      ...data,
      QuestionsNumber: e.target.value
    })
  }
  const submit = (e: any) => {
    e.preventDefault()
  }
  const ChanegDifficulty = (e: any) => {
    setData({
      ...data,
      Difficulty: e.target.value
    })
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Quiz App</h1>
      <div className='select-box'>
        <form onSubmit={submit}>
          DIFFICULTY   <select onChange={ChanegDifficulty}>
            <option value='easy' >easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>

        NO OF QUESTIONS<input
            type='number'
            size={3}
            required
            value={data.QuestionsNumber}
            onChange={ChangeNumber}
          />
        </form>
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
