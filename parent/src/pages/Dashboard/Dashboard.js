import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link, useHistory } from "react-router-dom";
import alanBtn from '@alan-ai/alan-sdk-web';

const Dashboard = () => {

    const history = useHistory();
    const [childEmail, setChildEmail] = useState("");

    const [error, setError] = useState(null)
    const [parentData, setParentData] = useState(null)

    const [dataUpdate, setDataUpdate] = useState(0)
    const [loading, setIsLoading] = useState(true)

    const addChild = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parentEmail: parentData.email,
                childEmail: childEmail
            })
        }

        fetch('https://finance-buddy-backend.vercel.app/addchild', requestOptions)
            .then(res => res.json())
            .then(({ error }) => {
                const hasError = error != null
                if (!hasError) {
                    alert('Added Child Successfully!')
                }
            })
            .catch(error => {
                console.log('Error Occured:', error)
            })

        setDataUpdate(dataUpdate + 1)
    }

    const logout = () => {
        history.push('/login')
        localStorage.clear()
    }

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        },
    };
    useEffect(() => {
        alanBtn({
            key: 'c36fceb84f21ccc938bf6be33a533f4b2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
              if (commandData.command === 'go:back') {
                // Call the client code that will react to the received command
              }
            }
        });
      }, []);
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
                    setIsLoading(false)
                }
                else {
                    setError(error)
                }
            })
            .catch((err) => {
                console.log(err);
            }); // Catch errors
    }, [dataUpdate]);


    return (<>
        {error && <h1>Some error occured, please refresh!</h1>}
        {loading && <div className={styles.loading}>Loading your content...</div>}
        {!error && !loading && parentData && <div className={styles.wrapper}>
            <div className={styles.navbar}>
                <h1 className={styles.logo}>Finance Buddy</h1>
                <div className={styles.sidebar_content}>
                    <ul className={styles.side_menu}>
                        <li className={styles.list_item}><Link to='/dashboard'>Dashboard</Link></li>
                        <li className={styles.list_item}><Link to='/quiz'>Assign Quizzes</Link></li>
                        <li className={styles.list_item}><Link to='/lesson'>Assign Lessons</Link></li>
                        <li className={styles.list_item} onClick={logout}>Log Out</li>
                    </ul>
                </div>
            </div>
            <div className={styles.dashboard_body}>
                <div className={styles.first_section}>
                    <div className={styles.name_div}>
                        <p className={styles.small_heading}>Hello!</p>
                        <p className={styles.big_heading}>{parentData.name}</p>
                        <p className={styles.small_heading}>Email: {parentData.email}</p>
                    </div>
                    <div className={styles.user_icon}></div>
                </div>
                <div className={styles.second_section}>
                    <div className={styles.add_children}>
                        <fieldset>
                            <legend className={styles.addChildrenLegend}><h3>Add Children</h3></legend>
                            <form onSubmit={addChild}>
                                <div className="form-group">
                                    <input
                                        id="inputForEmail"
                                        type="email"
                                        className={styles.form_control}
                                        aria-describedby="Enter email address"
                                        placeholder="Email"
                                        value={childEmail}
                                        onChange={(e) => {
                                            setChildEmail(e.target.value);
                                        }}
                                    />
                                    <button type="submit">Add Child</button>
                                </div>
                            </form>
                        </fieldset>
                    </div>
                    <div className={styles.progress}><h3>Your Children</h3>
                        {parentData.children.map((child, index) => {
                            return (<div key={index}>
                                <p><strong>Name:</strong> {child.name}</p>
                                <p><strong>Email:</strong> {child.email}</p>
                            </div>)
                        })}
                    </div>
                </div>
                <div className={styles.third_section}>
                    <p className={styles.section_heading}>
                        <span>Past Peformances of Your Children</span>
                    </p>
                    <div className={styles.tracks_wrapper}>
                        <div className={styles.track}>
                            <h2>Completed Quizzes</h2>
                            {parentData.quizHistory === 0 ? <div>No data to display</div> : parentData.quizHistory.map((history, index) => {
                                return (<div key={index}>
                                    <p><strong>Name:</strong> {history.name}</p>
                                    <p><strong>Topic:</strong> {history.topic.toUpperCase()}</p>
                                    <p><strong>Score:</strong> {history.score}</p>
                                </div>)
                            })}
                        </div>
                        <div className={styles.track}>
                            <h2>Completed Lessons</h2>
                            {parentData.lessonHistory === 0 ? <div>No data to display</div> : parentData.lessonHistory.map((history, index) => {
                                return (<div key={index}>
                                    <p><strong>Name:</strong> {history.name}</p>
                                    <p><strong>Topic:</strong> {history.topic.toUpperCase()}</p>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>);
};

export default Dashboard;
