import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './SwitchableInput.module.css';

const SwitchableInput = ({ toogleInput, setFieldTouched, formikValue, showInput, newValue, name, type, conditionChanged, conditionOk, textLabel, textButton, newTextLabel, clickOk, clickCancel }) => {
    return (
        <>
            { !showInput ? (
                <div className={styles.current}>
                    <p>
                        <span>
                            {textLabel}
                            {conditionChanged && ' (alterado)'}:
                        </span>
                        {newValue}
                    </p>
                    <button type='button' onClick={() => toogleInput(name, setFieldTouched)}>
                        {textButton}
                    </button>
                </div>
            ) : (
                <div className={styles.field_container}>
                    <div className={styles.field}>
                        <label htmlFor={name}>
                            {newTextLabel}:
                        </label>
                        <Field
                            name={name}
                            type={type}
                            value={formikValue}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <ErrorMessage
                            name={name}
                            component='span'
                        />
                        { conditionOk &&
                            <button type='button' onClick={clickOk}>
                                Ok
                            </button>
                        }
                        <button type='button' onClick={clickCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default SwitchableInput;