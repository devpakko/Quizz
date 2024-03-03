'use client';

import { useState, useEffect, ChangeEvent } from 'react';

interface Question {
  data: {
    questions: Array<{
      id: number;
      category: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      wrong_answers: Array<string>;
      answers: Array<string>;
    }>;
  };
}

export default function Quizz(props: Question) {
  const questionsData = props.data.questions;
  const [categories, setCategories] = useState(new Set(questionsData.map((item) => item.category)));
  const [difficulties, setDifficulties] = useState(new Set(questionsData.map((item) => item.difficulty)));
  const [filteredData, setFilteredData] = useState(questionsData);
  const [filter, setFilter] = useState('all');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    // Shuffle answers initially
    questionsData.forEach((item) => {
      const shuffledAnswers = [...item.answers].sort(() => Math.random() - 0.5);
      item.answers = shuffledAnswers;
    });
  }, []);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);

    if (event.target.value === 'all') {
      setFilteredData(questionsData);
    } else {
      const filtered = questionsData.filter((question) => question.category === event.target.value);
      setFilteredData(filtered);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return (
    <div>
      <div className="categories">
        <label htmlFor="all">
          <input
            type="radio"
            id="all"
            name="categories"
            value="all"
            checked={filter === 'all'}
            onChange={handleFilterChange}
          />
          all
        </label>
        {Array.from(categories).map((item, index) => (
          <label htmlFor={item} key={index}>
            <input
              type="radio"
              id={item}
              name="categories"
              value={item}
              checked={filter === item}
              onChange={handleFilterChange}
            />
            {item}
          </label>
        ))}
      </div>
      <div className="questions">
        {filteredData.map((item) => (
          <div key={item.id}>
            <p>{item.question}</p>
            <ul>
              {item.answers.map((answer, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={answer + index}
                    name="answers"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={() => handleAnswerSelect(answer)}
                  />
                  {answer}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Add logic to handle selected answer and display feedback based on your requirements */}
    </div>
  );
}
