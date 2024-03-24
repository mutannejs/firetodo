import React from 'react';

import { ErrorMessage, Field } from 'formik';

import styles from './Input.module.css';

const Input = ({ name, type, component, text, placeholder }) => {
    return (
        <div className={styles.field}>
            <label htmlFor={name}>{text}:</label>
            <Field type={type} component={component} name={name} placeholder={placeholder} />
            <div className={styles.erro}>
                <ErrorMessage name={name} component='span' />
            </div>
        </div>
    )
}

export default Input;