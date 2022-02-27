import React from "react";
import styles from "./lesson.module.css";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

function lesson() {
    return (
        <div className={styles.lesson}>
            <div className={styles.header}>
                <p className={styles.logo}>Finance Buddy</p>
                <div className={styles.lesson_name}>Crypto Lesson</div>
            </div>
            <div className={styles.lesson_body}>
               <p className={styles.lesson_content}>
               A systematic Investment Plan, commonly referred to as an SIP, allows you
                to invest a small sum regularly in your preferred mutual fund scheme. By
                activating an SIP, a fixed amount is deducted from your bank account
                every month, which gets invested in the mutual fund of your choice.",
                "Unlike a lump sum investment, you spread your investment over time with
                an SIP. Therefore, you do not need to have a large amount of money to
                get started with your mutual fund investment through SIPs. ", "By
                investing via an SIP, you are forced to set aside a sum at regular
                intervals, which help you instil a sense of financial discipline in the
                long run.", "Every time you invest in a mutual fund scheme through an
                SIP, you purchase a certain number of fund units corresponding to the
                amount you invested. You do not need to time the markets when investing
                through an SIP as you benefit from both bullish and bearish market
                trends.", "When the markets are down, you purchase more fund units while
                you purchase fewer units when the markets are surging.", "Since NAV of
                all mutual funds are updated on a daily basis, the cost of purchase may
                vary from one SIP instalment to another. Over time, the cost of purchase
                averages out and turns out to be on the lower side. This is known as
                rupee cost averaging. This benefit is not available when you invest a
                lump sum.</p> 
            </div>
        </div>
    );
}

export default lesson;
