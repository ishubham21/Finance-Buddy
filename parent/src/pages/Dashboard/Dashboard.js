import React, { useEffect, useState } from "react";
import styles from "./Dashboard.css";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const history = useHistory();
    console.log(localStorage.getItem("token"));
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
        .then(data => console.log(data))
        .catch((err) => {
            console.log(err);
          }); // Catch errors
    }, []);

    return <h1>Dashboard</h1>;
};

export default Dashboard;
