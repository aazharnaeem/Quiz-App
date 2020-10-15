import React, { useEffect } from 'react';
import './App.css';
import { quizdetails } from './service/quiz_Service'
import {QuizType} from './Types/quizTypes'

function App() {
  useEffect(() => {
    async function fetchData() {
      const question: QuizType[] = await quizdetails(5,'easy')
      console.log(question)
    }
    fetchData()
  }, [])
  // if(!.length)
  // return<h3>Loading...</h3>

  return (
    <div className="App">
    </div>
  );
}

export default App;
