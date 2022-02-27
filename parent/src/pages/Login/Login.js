import React from "react";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import alanBtn from '@alan-ai/alan-sdk-web';
const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [statusText, setStatusText] = useState(null);
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };



    setStatusText("Checking");
    fetch(
      "https://finance-buddy-backend.vercel.app/parent/login",
      requestOptions
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then(({ error, data }) => {
        const hasError = error != null;
        setStatusText(hasError ? `${error}` : "logging in");
        if (!hasError) {
          setTimeout(() => {
            localStorage.setItem("token", data.token);
            history.push("/dashboard");
          }, 3000);
        }
      })

      .catch((err) => {
        setStatusText(err);
        console.log(err);
      }); // Catch errors
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login_div}>
        {statusText && <div className={styles.status}>{statusText}</div>}
        <fieldset>
          <legend className={styles.registrationFormLegend}>
            Sign in to Finance Buddy
          </legend>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label htmlFor="inputForEmail">Email address</label> */}
              {/* <span className="mandatory">*</span> */}
              <input
                id="inputForEmail"
                type="email"
                className="form-control mandatory"
                aria-describedby="Enter email address"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="inputForPassword">Password</label> */}
              {/* <span className="mandatory">*</span> */}
              <input
                type="password"
                className="form-control mandatory"
                id="inputForPassword"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={styles.button_container}>
              <button type="submit" className={styles.btn}>
                Sign In
              </button>
              {/* <button className="btn btn-link">
              <Link to="/login">Cancel</Link>
            </button> */}
            </div>
          </form>
        </fieldset>
      </div>
      <div className={styles.logo_div}>
        <h1>Welcome Back!</h1>
        <p className={styles.tagline}>
          To keep connected with us please login with your personal info
        </p>
        <div className={styles.button_container}>
          <button type="submit" className={styles.btn_border}>
            <Link className={styles.button_link} to="/register">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
