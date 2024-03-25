// React
import React, { useContext, useState } from 'react';
// Formik
import { Form, Formik } from 'formik';
// Yup
import * as yup from 'yup';
// Firebase
import { addDoc, collection, count, getCountFromServer, query, where } from "firebase/firestore";
// Contexts
import { LoginContext } from '../context/LoginContext';
//Components
import Input from '../components/form/Input';
import { Button } from '../components/form/Button';
import Message from '../components/message/Message';
// Styles
import styles from './NewTodo.module.css';

const NewTodo = ({ db }) => {

    const [message, setMessage] = useState('');
    const { user, validateAuth } = useContext(LoginContext);

    validateAuth();

    const addTodo = (values, resetForm) => {
        const q = query(
            collection(db, 'todos'),
            where('uid', '==', user.uid),
            where('completed', '==', false)
        );
        getCountFromServer(q).then((querySnapshot) => {
            return querySnapshot.data().count
        })
            .then((countDocs) => {
                return addDoc( collection(db, 'todos'), {
                    uid: user.uid,
                    todo: values.todo,
                    comment: values.comment,
                    completed: false,
                    order: countDocs
                })
            })
            .then(() => {
                setMessage('Tarefa adicionada com sucesso!');
                resetForm();
            })
            .catch((error) => {
                setMessage('Ocorreu um erro ao criar a tarefa!');
            });
    }

    return (
        <div>
            {message && (
                <Message message={message} setMessage={setMessage} time={3000} />
            )}

            <h1>Nova tarefa</h1>
            
            <Formik
                initialValues={{
                    todo: '',
                    comment: ''
                }}
                validationSchema={yup.object({
                    todo: yup.string().required('obrigatório'),
                    comment: yup.string()
                })}
                onSubmit={(values, actions) => addTodo(values, actions.resetForm)}
            >
                {({resetForm}) => <Form>
                    <Input
                        name='todo'
                        type='text'
                        text='Tarefa'
                        placeholder='Descreva a tarefa'
                    />
                    <Input
                        name='comment'
                        type='text'
                        component='textarea'
                        text='Comentário'
                        placeholder='Opcionalmente, você pode acrescentar um comentário à tarefa'
                    />
                    <div className={styles.buttons}>
                        <Button
                            type='submit'
                            text='Criar tarefa'
                        />
                        <Button
                            type='button'
                            text='Limpar'
                            click={() => resetForm()}
                        />
                    </div>
                </Form> }
            </Formik>
        </div>
    )
}

export default NewTodo;