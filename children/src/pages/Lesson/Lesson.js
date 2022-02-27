import React, { useEffect } from "react";
import styles from "./lesson.module.css";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Lesson = () => {
    const [lesson, setLesson] = useState(null);
    const history = useHistory()
    const childData = JSON.parse(localStorage.getItem('child'))

    const submitLesson = () => {

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parentEmail: childData.parent[0].name,
                childEmail: childData.email,
                lessonTopic: topic
            }),
        }

        fetch('https://finance-buddy-backend.vercel.app/lesson/complete', requestOptions)
        .then(res => res.json())
        .then(({error}) => {
            if(!error){
                alert('Marked as completed')
                history.push('/dashboard')
            }
        })
        .catch(err => console.log(err))
    }

    const requestOptions = {
        method: 'GET',
    };

    const search = useLocation().search
    const topic = new URLSearchParams(search).get('topic');

    useEffect(() => {
        fetch(`https://finance-buddy-backend.vercel.app/lesson?topic=${topic}`, requestOptions)
            .then((response) => response.json()) // convert to json
            .then(({ error, lesson }) => {
                const hasError = error != null;
                if (!hasError) {
                    setLesson(lesson);
                    console.log(lesson)
                } else {
                    setLesson("error");
                }
            })
            .catch((err) => {
                console.log(err);
            }); // Catch errors
    }, [])

    return (
        <>
            {lesson && <div className={styles.lesson}>
                <div className={styles.header}>
                    <p className={styles.logo}>Finance Buddy</p>
                    <div className={styles.lesson_name}>{topic.toUpperCase()} Lesson</div>
                </div>
                <div className={styles.lesson_body}>
                    {lesson.map((less, index) => {
                        return <p key={index} style={{ marginBottom: '15px' }}>
                            {less}
                        </p>
                    })}
                </div>

                <button onClick={submitLesson}>Mark as Complete</button>
            </div>}
        </>
    );
};

export default Lesson;
