import React, { useEffect, useState } from "react";
import styles from "./Dashboard.css";
import { useHistory } from "react-router-dom";

const Dashboard = () => {

    const [childData, setChildData] = useState(null)
    const [error, setError] = useState(null)
    const history = useHistory();

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
        fetch(
            "https://finance-buddy-backend.vercel.app/child/dashboard",
            requestOptions
        )
            .then((response) => response.json()) // convert to json
            .then(({ error, data }) => {

                const hasError = error != null
                if (!hasError) {
                    setChildData(data.child)
                    localStorage.setItem("child", childData)
                }
                else {
                    setError(error)
                }
            })
            .catch((err) => {
                console.log(err);
            }); // Catch errors
    }, [requestOptions]);

    return (<>

        {/* {error && <h2>Looks like something broke, please refresh! </h2>}*/}

        {!error && <div style={styles.wrapper}>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>}

    </>);
};

export default Dashboard;
