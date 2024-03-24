// React, React-router-dom
import React from 'react';
// Formik
import { Form, Formik } from 'formik';
// Components
import Input from '../form/Input';
import { Button, Navigate } from '../form/Button';
// Styles
import './FormAuth.module.css';

const FormAuth = ({ validationSchema, initialValues, username, handleSubmit, textSubmit, link, textNavigate }) => {

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                <Form>
                    <Input name='email' type='email' text='Email' placeholder='Insira seu email' />
                    { username &&
                        <Input name='username' type='text' text='Nome' placeholder='Insira seu nome de usuário' />
                    }
                    <Input name='password' type='password' text='Senha' placeholder='Insira sua senha' />
                    <Button type='submit' text={textSubmit} /> <br />
                    <Navigate link={link} text={textNavigate} />
                </Form>
            </Formik>
        </>
    )
}

export default FormAuth;