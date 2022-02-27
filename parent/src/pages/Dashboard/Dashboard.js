import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const history = useHistory();
    const [email, setEmail] = useState(null);
    console.log(localStorage.getItem("token"));

    const handleClick = (e) =>{
        const request = {
            method: "GET",
            // headers: {
            //     "Content-Type": "application/json",
            // }, 
        };
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
            "https://finance-buddy-backend.vercel.app/parent/dashboard",
            requestOptions
        )
            .then((response) => response.json()) // convert to json
            .then((data) => console.log(data))
            .catch((err) => {
                console.log(err);
            }); // Catch errors
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navbar}>
                <h1 className={styles.logo}>Finance Buddy</h1>
                <div className={styles.sidebar_content}>
                    <ul className={styles.side_menu}>
                        <li className={styles.list_item}>Dashboard</li>
                        <li className={styles.list_item}>Assign Quizes</li>
                        <li className={styles.list_item}>Assign Lessons</li>
                        <li className={styles.list_item}>Settings</li>
                        <li className={styles.list_item}>Log Out</li>
                    </ul>
                </div>
            </div>
            <div className={styles.dashboard_body}>
                <div className={styles.first_section}>
                    <div className={styles.name_div}>
                        <p className={styles.small_heading}>Hello!</p>
                        <p className={styles.big_heading}>John Doe</p>
                    </div>
                    <div className={styles.user_icon}></div>
                </div>
                <div className={styles.second_section}>
                    <div className={styles.add_children}>
                        <fieldset>
                            <legend className={styles.addChildrenLegend}>Add Children</legend>
                            <form>
                                <div className="form-group">
                                    <input
                                        id="inputForEmail"
                                        type="email"
                                        className={styles.form_control}
                                        aria-describedby="Enter email address"
                                        placeholder="Email"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </form>
                        </fieldset>
                    </div>
                    <div className={styles.progress}>Progress</div>
                </div>
                <div className={styles.third_section}>
                    <p className={styles.section_heading}>
                        <span>Featured</span> Tracks
                    </p>
                    <div className={styles.tracks_wrapper}>
                        <div className={styles.track}>
                            <p className={styles.track_heading}>Quizzes</p>
                            <div className={styles.sub_tracks_wrapper}>
                                <div className={styles.sub_tracks} onClick={handleClick}>SIP</div>
                                <div className={styles.sub_tracks} onClick={handleClick}>Mutual Funds</div>
                                <div className={styles.sub_tracks} onClick={handleClick}>NFTs</div>
                                <div className={styles.sub_tracks} onClick={handleClick}>Crypto</div>
                            </div>
                        </div>
                        <div className={styles.track}>
                            <p className={styles.track_heading}>Lessons</p>
                            <div className={styles.sub_tracks_wrapper}>
                                <div className={styles.sub_tracks} onClick={handleClick}>SIP</div>
                                <div className={styles.sub_tracks} onClick={handleClick}>Mutual Funds</div>
                                <div className={styles.sub_tracks} onClick={handleClick}>NFTs</div>
                                <div className={styles.sub_tracks} onClick={handleClick}>Crypto</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
