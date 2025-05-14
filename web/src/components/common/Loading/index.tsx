"use client"
import styles from './loading.module.css';
import React from "react"


const Loading = ({ }) => {
    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.dot} ${styles['dot-1']}`}></div>
                <div className={`${styles.dot} ${styles['dot-2']}`}></div>
                <div className={`${styles.dot} ${styles['dot-3']}`}></div>
            </div>

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            result="blur"
                            stdDeviation="10"
                            in="SourceGraphic"
                        ></feGaussianBlur>
                        <feColorMatrix
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                            mode="matrix"
                            in="blur"
                        ></feColorMatrix>
                    </filter>
                </defs>
            </svg>
        </>
    );
};

export default Loading;