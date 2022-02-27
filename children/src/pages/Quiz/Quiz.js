import React from "react";
import styles from "./quiz.module.css";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

function Quiz(){
    return(
        <div className={styles.quiz}>
            <div className={styles.header}>
                <p className={styles.logo}>
                    Finance Buddy
                </p>
                <div className={styles.quiz_name}>
                    Crypto Quiz
                </div>
            </div>
            <div className={styles.quiz_body}>
                <div className={styles.question_div}>
                    <p className={styles.question}>
                        Lorem ipsum dolo dit amer?
                    </p>
                </div>
                <div className={styles.options_wrapper}>
                    <div className={styles.option}>
                        Option
                    </div>
                    <div className={styles.option}>
                        Option
                    </div>
                </div>
                <div className={styles.button_container}>
							<button className={styles.btn}>
								Next Question
							</button>
                </div>
            </div>
        </div>
    )
}

export default Quiz;