import React from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {

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
        <fieldset>
          <legend className={styles.registrationFormLegend}>
            Create Account
          </legend>
          <form>
            <div className="form-group">
              {/* <label htmlFor="inputForName">Your Name</label> */}
              {/* <span className="mandatory">*</span> */}
              <input
                id="inputForName"
                type="text"
                className="form-control mandatory"
                aria-describedby="Enter your name"
                placeholder="Name"
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
