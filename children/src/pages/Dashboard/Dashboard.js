import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [childData, setChildData] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
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

    useEffect(() => {
        fetch(
            "https://finance-buddy-backend.vercel.app/child/dashboard",
            requestOptions
        )
            .then((response) => response.json()) // convert to json
            .then(({ error, data }) => {
                const hasError = error != null;
                if (!hasError) {
                    setChildData(data.child);
                    localStorage.setItem("child", childData);
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

            {!error && (
                <div className={styles.wrapper}>
                    {/* <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button> */}
                    <div className={styles.navbar}>
                        <h1 className={styles.logo}>Finance Buddy</h1>
                        <div className={styles.sidebar_content}>
                            <ul className={styles.side_menu}>
                                <li className={styles.list_item}>Dashboard</li>
                                <li className={styles.list_item}>Settings</li>
                                <li className={styles.list_item} onClick={logout}>
                                    Log Out
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.dashboard_body}>
                        <div className={styles.first_section}>
                            <div className={styles.name_div}>
                                <p className={styles.small_heading}>Hi John,</p>
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
                                    <div className={styles.history}>
                                        <p className={styles.content}>SIP Quiz</p>
                                        <p className={styles.content}>5 points</p>
                                    </div>
                                    <div className={styles.history}>
                                        <p className={styles.content}>SIP Lesson</p>
                                        <p className={styles.content}>Done</p>
                                    </div>
                                    <div className={styles.history}>
                                        <p className={styles.content}>NFT Quiz</p>
                                        <p className={styles.content}>3 points</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.upcoming_tests_wrapper}>
                                <p className={styles.section_heading_sm}>
                                    <span>Upcoming</span> Tests
                                </p>
                                <div className={styles.tests_content}>
                                    <div className={styles.test}>
                                        <p className={styles.content_sm}>Mutual Funds Quiz</p>
                                    </div>
                                    <div className={styles.test}>
                                        <p className={styles.content_sm}>Crypto Quiz</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.third_section}>
                            <p className={styles.section_heading}>
                                <span>Assigned</span> Lessons
                            </p>
                            <div className={styles.lesson_wrapper}>
                                <div className={styles.track}>
                                    <div className={styles.lesson}>Crypto Lesson</div>
                                    <div className={styles.lesson}>NFTs Lesson</div>
                                    <div className={styles.lesson}>Mutual Funds Lesson</div>
                                    <div className={styles.lesson}>SIP Lesson</div>
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
