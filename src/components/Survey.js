import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'; 
import Question from './Question';
import ThankYou from './ThankYou';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
  { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', scale: 10 },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' },
];

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage('survey-answers', {});
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the survey?')) {
      setAnswers(prevAnswers => ({ ...prevAnswers, status: 'COMPLETED' }));
      setCompleted(true);
    }
  };

  if (completed) {
    return <ThankYou />;
  }

  const question = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Survey</h1>
      <div>
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <Question
          question={question}
          onAnswer={handleAnswer}
          answer={answers[question.id]}
        />
        <div>
          {currentQuestionIndex > 0 && <button onClick={handlePrevious}>Previous</button>}
          <button onClick={handleSkip}>Skip</button>
          <button onClick={handleNext}>Next</button>
          {currentQuestionIndex === questions.length - 1 && <button onClick={handleSubmit}>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default Survey;
