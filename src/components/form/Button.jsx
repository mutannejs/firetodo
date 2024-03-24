import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

export const Button = ({ type, text, click }) => {
    return (
        <div className={styles.btn}>
            <button type={type} onClick={click}>{text}</button>
        </div>
    )
}

export const Navigate = ({ link, text }) => {
    return (
        <div className={styles.navigate}>
            <Link to={link}>{text}</Link>
        </div>
    )
}