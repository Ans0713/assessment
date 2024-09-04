import React from 'react';

const Question = ({ question, onAnswer, answer }) => {
  const handleChange = (e) => {
    onAnswer(question.id, e.target.value);
  };

  return (
    <div>
      <p>{question.text}</p>
      {question.type === 'rating' && (
        <div>
          {[...Array(question.scale).keys()].map(num => (
            <label key={num}>
              <input
                type="radio"
                name={question.id}
                value={num + 1}
                checked={answer === (num + 1).toString()}
                onChange={handleChange}
              />
              {num + 1}
            </label>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <textarea
          value={answer || ''}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default Question;
