import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Frequentlyque = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const categories = ["General", "Companies", "Members", "Society"];

  const questions = {
    General: [
      {
        id: 1,
        question: "Nisi nisi magna nostrud non consequat conse ?",
        answer:
          "Ullamco velit ut culpa sunt sint est enim est velit reprehenderit tempor mollit. Aliqua excepteur nisi culpa reprehenderit adipisicing aliqua excepteur nulla minim.",
      },
      {
        id: 2,
        question:
          "Nostrud eiusmod exercitation duis reprehenderit labore ullamco. Magna culpa offirm ?",
        answer: "Answer for question 2",
      },
      {
        id: 3,
        question:
          "Fugiat pariatur minim eiusmod aute adipisicing aliqua occaecat ?",
        answer: "Answer for question 3",
      },
    ],
    Companies: [
      {
        id: 4,
        question: "Nostrud eiusmod exercitation duis ?",
        answer: "Answer for Companies question 1",
      },
      {
        id: 5,
        question:
          "Velit quis ipsum sint consectetur si sint Lorem minim fugiat. Velit sunt veniam est adipisicing ?",
        answer: "Answer for Companies question 2",
      },
    ],
    Members: [
      {
        id: 6,
        question:
          "Deserunt consequat esse occaecat anim sunt quis mollit et est adipisicing incididunt ?",
        answer: "Answer for Members question",
      },
    ],
    Society: [
      {
        id: 7,
        question: "Aliquip irure mollit deserunt ipsum sit sunt veniam?",
        answer: "Answer for Society question",
      },
    ],
  };

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-green-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-400 p-6">
          <h1 className="text-3xl font-bold text-white text-center mb-4">
            Frequently asked questions
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 pr-10 rounded-full bg-green-300 text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-3 top-3 text-green-100"
            />
          </div>
        </div>

        <div className="flex">
          <div className="w-1/4 bg-gray-100 p-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left py-2 px-4 rounded ${
                  activeCategory === category
                    ? "bg-green-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="w-3/4 p-6">
            {questions[activeCategory].map((item) => (
              <div key={item.id} className="mb-4">
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="flex justify-between items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded"
                >
                  <span>{item.question}</span>
                  <FontAwesomeIcon
                    icon={
                      expandedQuestion === item.id
                        ? faChevronDown
                        : faChevronRight
                    }
                  />
                </button>
                {expandedQuestion === item.id && (
                  <div className="mt-2 p-3 bg-white">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frequentlyque;