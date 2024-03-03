"use client";

import { useState, useEffect, ChangeEvent } from "react";

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
  const categories: Array<string> = [];
  const difficulties: Array<string> = [];

  for (let i = 0; i < questionsData.length; i++) {
    questionsData.map((item) => {
      for (let i = item.answers.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [item.answers[i], item.answers[randomIndex]] = [
          item.answers[randomIndex],
          item.answers[i],
        ];
      }
    });
    questionsData.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
      if (!difficulties.includes(item.difficulty)) {
        difficulties.push(item.difficulty);
      }
    });
  }
  const [filteredData, setFilteredData] = useState(questionsData);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (
    event: ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    setFilter(item);

    if (item === "all") {
      setFilteredData(questionsData);
    } else {
      const filtered = questionsData.filter(
        (question) => question.category === item
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <div className="categories">
        <label htmlFor="all">
          <input
            type="radio"
            id="all"
            name="categories"
            onChange={(event) => handleFilterChange(event, "all")}
          />
          all
        </label>
        {categories.map((item, index: number) => (
          <label htmlFor={item} key={index}>
            <input
              type="radio"
              id={item}
              name="categories"
              onChange={(event) => handleFilterChange(event, item)}
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
              {item.answers.map((item, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
