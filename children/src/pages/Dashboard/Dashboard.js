import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [childData, setChildData] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();

    const logout = () => {
        history.push("/login");
        localStorage.clear();
    };

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        },
    };

    const loadLesson = (topic) => {
        history.push(`/lesson?topic=${topic}`)
    }

    const loadQuiz = (topic) => {
        history.push(`/quiz?topic=${topic}`)
    }

    useEffect(() => {
        fetch(
            "https://finance-buddy-backend.vercel.app/child/dashboard",
            requestOptions
        )
            .then((response) => response.json()) // convert to json
            .then(({ error, data, content }) => {
                const hasError = error != null;
                if (!hasError) {
                    setChildData(data.content);
                    localStorage.setItem("child", JSON.stringify(data.content));
                } else {
                    setError(error);
                }
            })
            .catch((err) => {
                console.log(err);
            }); // Catch errors
    }, []);

    return (
        <>
            {/* {error && <h2>Looks like something broke, please refresh! </h2>}*/}

            {!error && childData && (
                <div className={styles.wrapper}>
                    <div className={styles.navbar}>
                        <h1 className={styles.logo}>Finance Buddy</h1>
                        <div className={styles.sidebar_content}>
                            <ul className={styles.side_menu}>
                                <li className={styles.list_item}>Dashboard</li>
                                <li className={styles.list_item} onClick={logout}>
                                    Log Out
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.dashboard_body}>
                        <div className={styles.first_section}>
                            <div className={styles.name_div}>
                                <p className={styles.small_heading}>Hi {childData.name},</p>
                                <p className={styles.big_heading}>What will you learn today?</p>
                            </div>
                            <div className={styles.user_icon}></div>
                        </div>
                        <div className={styles.second_section}>
                            <div className={styles.history_wrapper}>
                                <p className={styles.section_heading}>
                                    <span>Your</span> History
                                </p>
                                <div className={styles.history_content}>
                                    <h3 style={{ marginBottom: '10px' }}>Your Quizzes</h3>
                                    {childData.quizHistory.length === 0 ? <div className={styles.history}>No past records</div> : childData.quizHistory.map((quiz, index) => {
                                        return <div className={styles.history} key={index}>
                                            <p className={styles.content}>{quiz.topic.toUpperCase()} Quiz</p>
                                            <p className={styles.content}>{quiz.score} points</p>
                                        </div>
                                    })}

                                    <h3 style={{ marginBottom: '10px' }}>Your Lessons</h3>
                                    {childData.lessonHistory.length === 0 ? <div className={styles.history}>No past records</div> : childData.lessonHistory.map((lesson, index) => {
                                        return <div className={styles.history} key={index}>
                                            <p className={styles.content}>{lesson.topic.toUpperCase()} Quiz</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className={styles.upcoming_tests_wrapper}>
                                <p className={styles.section_heading_sm}>
                                    <span>Upcoming</span> Tests
                                </p>
                                <div className={styles.tests_content}>

                                    {childData.assignedQuizzes.length === 0 ? <div className={styles.test}>No dues</div> : childData.assignedQuizzes.map((quiz, index) => {
                                        return <div className={styles.test} key={index} onClick={() => {loadQuiz(quiz.quizTopic)}}>
                                            <p className={styles.content_sm}>{quiz.quizTopic.toUpperCase()}</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={styles.third_section}>
                            <p className={styles.section_heading}>
                                <span>Assigned</span> Lessons
                            </p>
                            <div className={styles.lesson_wrapper}>
                                <div className={styles.track}>

                                    {childData.assignedLessons.length === 0 ? <div className={styles.lesson}>No dues</div> : childData.assignedLessons.map((lesson, index) => {
                                        return <div className={styles.lesson} key={index} onClick={() => {loadLesson(lesson.lessonTopic)}}>
                                            {lesson.lessonTopic.toUpperCase()}
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
