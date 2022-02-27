import React from "react";
import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import alanBtn from '@alan-ai/alan-sdk-web';

const Register = () => {
  const [name, setName] = useState(null);
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
        name,
        email,
        password,
      }),
    };

    setStatusText("Registration in progress");
    fetch(
      "https://finance-buddy-backend.vercel.app/parent/register",
      requestOptions
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then(({ error }) => {
        const hasError = error != null;
        setStatusText(
          hasError
            ? `${error}`
            : `Congratulations, ${name}. You have been successfully registered!`
        );
        history.push("/login");
      })

      .catch((err) => {
        setStatusText(err);
        console.log(err);
      }); // Catch errors
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo_div}>
        <h1>Hello, Friend!</h1>
        <p className={styles.tagline}>
          Enter your personal details to start your journey with us
        </p>
        <div className={styles.button_container}>
          <button type="submit" className={styles.btn_border}>
            <Link className={styles.button_link} to="/login">
              Sign In
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.login_div}>
        {statusText && <div className={styles.status}>{statusText}</div>}
        <fieldset>
          <legend className={styles.registrationFormLegend}>
            Create Account
          </legend>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label htmlFor="inputForName">Your Name</label> */}
              {/* <span className="mandatory">*</span> */}
              <input
                id="name"
                type="text"
                className="form-control mandatory"
                aria-describedby="Enter your name"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

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
                Sign Up
              </button>
              {/* <button className="btn btn-link">
              <Link to="/login">Cancel</Link>
            </button> */}
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Register;
