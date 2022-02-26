import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
const Login = () => {
return (
    <div className={styles.wrapper}>
      <div className={styles.login_div}>
        <fieldset>
          <legend className={styles.registrationFormLegend}>
            Sign in to Finance Buddy
          </legend>
          <form>
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