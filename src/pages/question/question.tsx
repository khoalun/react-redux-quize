import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decode } from 'html-entities';

import { RootState } from '../../redux/types';
import Button from '@mui/material/Button/Button';
import { Box, Typography } from '@mui/material';
import { updateScore } from '../../redux/actions/leaderBoardActions';
import { DIFFICULTY_TIME } from '../../configs';
import { formatTimer } from '../../utils/formatTimer';
import { randomPositionAnwser } from '../../utils/randomPositionAnwser';

interface IDataQuestion {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

function Question() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [dataSource, setDataSource] = React.useState<IDataQuestion[]>([]);
  const [score, setScore] = React.useState(0);
  const [countTime, setCountTime] = React.useState(DIFFICULTY_TIME[formData.difficulty || 'easy']);

  React.useEffect(() => {
    const { category, difficulty, type, amount } = formData;

    if (!category || !difficulty || !type || !amount) {
      navigate('/');
      return
    };

    async function fetchQuestions() {
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
      const data = await res.json();
      const dataSource = data.results;

      if(dataSource.length === 0) return;

      const question = dataSource[questionIndex] as IDataQuestion;
      const options = [...question.incorrect_answers];
      options.splice(
        randomPositionAnwser(formData.type),
        0,
        question.correct_answer
      )

      setAnswers(options);
      setDataSource(dataSource)
    }
    fetchQuestions(); 
  }, [formData]) 

  // count timer
  React.useEffect(() => {
    if (answers.length === 0) return;
    
    const timer = setInterval(() => {
      setCountTime(prevState => {
        if(prevState > 0) {
          return prevState - 1
        }
        // auto random anwser and next question
        const content = answers[randomPositionAnwser(formData.type)]; 
        handleAnswer(content);
        return DIFFICULTY_TIME[formData.difficulty];
      })
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [answers])
  
  // next question
  React.useEffect(() => {
    if (questionIndex === 0) return;

    const question = dataSource[questionIndex] as IDataQuestion;
    const options = [...question.incorrect_answers];
      options.splice(
        randomPositionAnwser(formData.type),
        0,
        question.correct_answer
      )
      setAnswers(options);
  }, [questionIndex, dataSource])

  function handleAnswer(answer: string) {
    const question = dataSource[questionIndex];

    console.log('answer: ', {
      answer,
      correct_answer: question.correct_answer
    })

    if (answer === question.correct_answer) {
      setScore(prevState => {
        const newScore = prevState + 1;
        dispatch(updateScore(newScore));

        return newScore
      });
    }

    if (questionIndex + 1 === dataSource.length) {
      navigate('/final-score');
      return;
    }

    setQuestionIndex(prevState => prevState + 1)
  }

  return (
    <>
      <h1 className="title">Question {questionIndex + 1}</h1>

      <div>{decode(dataSource[questionIndex]?.question || '')}</div>

      <div>{dataSource.length === 0 && 'Please choose quetion'}</div>
      <br />

      {answers.map((answer) => (
        <Button 
          key={answer} 
          variant="contained" 
          fullWidth sx={{ mb: 2 }}
          onClick={() => handleAnswer(answer)}
        >
          {decode(answer)}
        </Button>
      ))}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography>
          Score: {score}/{dataSource.length}
        </Typography>
        <Typography
          sx={{
            color: countTime < 10 ? 'red' : 'black',
            // opacity: countTime < 10 ? 0.1 : 1,
            // transition: 'all .5s linear'
          }}
        >
          Timer: {formatTimer(countTime)}
        </Typography>
      </Box>

      {/* <div style={{textAlign: 'left', marginLeft:'20px'}}>
        <h2>Quiz Information</h2>
        <p>Category: {formData.category}</p>
        <p>Difficulty: {formData.difficulty}</p>
        <p>Type: {formData.type}</p>
        <p>Amount: {formData.amount}</p>
        
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div> */}
    </>
  );
}

export default Question;