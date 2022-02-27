import { useState, useEffect } from "react"
import styles from './Lesson.module.css'

const Lesson = () => {
    const [parentData, setParentData] = useState(null)
    const [lessonTopic, setLessonTopic] = useState(null)
    const [childEmail, setChildEmail] = useState(null)
    const [dataUpdate, setDataUpdate] = useState(0)
    const [loading, setLoading] = useState(true)

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        },
    };

    useEffect(() => {
        fetch(
            "https://finance-buddy-backend.vercel.app/parent/dashboard",
            requestOptions
        )
            .then((response) => response.json()) // convert to json
            .then(({ error, data }) => {

                const hasError = error != null
                if (!hasError) {
                    setParentData(data.content)
                    localStorage.setItem("parent", JSON.stringify(data.content))
                    console.log(data.content)
                    setLoading(false)
                }
                else {
                    console.log(error)
                }
            })
            .catch((err) => {
                console.log(err);
            }); // Catch errors
    }, [dataUpdate]);

    const addLesson = (e) => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parentEmail: parentData.email,
                childEmail,
                lessonTopic
            })
        }

        console.log(parentData.email)

        fetch('https://finance-buddy-backend.vercel.app/lesson/assign', requestOptions)
            .then(res => res.json())
            .then(({ error }) => {
                if (!error) {
                    alert('Assigned successfully')
                    setDataUpdate(dataUpdate + 1)
                }
                console.log(error)
            })
            .catch(err => console.log(err))
    }

    return (<div className={styles.wrapper}>
        {loading && <div className={styles.loading}>Loading data...</div>}
        {parentData && !loading && <div className={styles.topLevel}>
            <h1>Lesson Manager</h1>
            <div className={styles.content}>
                <h3>Assign a new Quiz</h3>
                <div>
                    <form onSubmit={addLesson}>
                        <label>
                            Select Topic
                            <select onChange={(e) => { setLessonTopic(e.target.value) }}>
                                <option>Topic</option>
                                <option value="sip">SIP</option>
                                <option value="crypto">Cryptocurrency</option>
                                <option value="mutualFunds">Mutual Funds</option>
                                <option value="nft">Non-Fungible Tokens</option>
                            </select>
                        </label>

                        <label>
                            Select Child Email
                            <select onChange={(e) => { setChildEmail(e.target.value) }}>
                                <option>Child</option>
                                {parentData.children && parentData.children.map((child, index) => {
                                    return <option value={child.email} key={index}>{child.name}</option>
                                })}
                            </select>
                        </label>

                        <button type="submit">Assign</button>
                    </form>
                </div>
            </div>

            <div className={styles.content}>
                <h3>Previously Assigned Quizzes</h3>
                <div>
                    {parentData.assignedLessons && parentData.assignedLessons.map((lesson, index) => {
                        return <div key={index} className={styles.maj}>
                            <p><strong>Name:</strong> {lesson.name}</p>
                            <p><strong>Topic:</strong> {lesson.lessonTopic}</p>
                            <p><strong>Completed:</strong> {lesson.completed ? 'Yes' : 'No'}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>}
    </div>)
}

export default Lesson