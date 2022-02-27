import React, { useEffect } from "react";
import styles from "./quiz.module.css";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Quiz() {

    const [questions, setQuestions] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const childData = JSON.parse(localStorage.getItem('child'))
    const search = useLocation().search
    const topic = new URLSearchParams(search).get('topic');

    const history = useHistory()

    const updateDash = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parentEmail: childData.parent[0].name,
                childEmail: childData.email,
                quizTopic: topic,
                quizScore: score
            }),
        }

        fetch('https://finance-buddy-backend.vercel.app/quiz/complete', requestOptions)
            .then(res => res.json())
            .then(({ error }) => {
                if (!error) {
                    alert('Marked as completed')

                }
            })
            .catch(err => console.log(err))

        history.push('/dashboard')
    }

    const requestOptions = {
        method: 'GET',
    };
    useEffect(() => {
        fetch(`https://finance-buddy-backend.vercel.app/quiz?topic=${topic}`, requestOptions)
            .then((response) => response.json()) // convert to json
            .then(({ error, questions }) => {
                const hasError = error != null;
                if (!hasError) {
                    setQuestions(questions);
                }
            })
            .catch((err) => {
                console.log(err);
            }); // Catch errors
    }, [])

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            updateDash()
        }
    };

    return (<>
        {questions && <div className={styles.quiz}>
            <div className={styles.header}>
                <p className={styles.logo}>
                    Finance Buddy
                </p>
                <div className={styles.quiz_name}>
                    {topic.toUpperCase()} Quiz
                </div>
            </div>
            <div className={styles.quiz_body}>

                <div className='app'>
                    {showScore ? (
                        <div className='score-section'>
                            You scored {score} out of {questions.length}
                        </div>
                    ) : (
                        <>
                            <div className={styles.question_div}>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <div className={styles.question}>{questions[currentQuestion].question}</div>
                            </div>
                            <div className={styles.options_wrapper}>
                                {questions[currentQuestion].answers.map((answerOption, index) => (
                                    <div className={styles.option} key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.text}</div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>}
    </>
    )
}

export default Quiz;