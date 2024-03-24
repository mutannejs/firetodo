import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { deleteUser, updatePassword, updateProfile } from 'firebase/auth';
// Components
import Message from '../components/message/Message';
import SwitchableInput from '../components/form/SwitchableInput';
import { Button } from '../components/form/Button';
// Contexts
import { LoginContext } from '../context/LoginContext';
// Styles
import styles from './User.module.css';
import { useNavigate } from 'react-router-dom';

const User = () => {

    const { user, setUser, validateAuth } = useContext(LoginContext);
    validateAuth();
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [newValues, setNewValues] = useState({
        username: user?.displayName,
        password: ''
    });
    const [showInput, setShowInput] = useState({
        username: false,
        password: false
    });

    const toogleInput = (field, setFieldTouched) => {
        setShowInput((prev) => ({ ...prev, [field]: !prev[field] }) );
        setFieldTouched(field, true);
    };

    const submitForm = () => {
        if (newValues.username !== user.displayName) {
            updateProfile(user, {displayName: newValues.username})
                .then(() => {
                    setMessage('Usuário atualizado!');
                })
                .catch((error) => {
                    setMessage(`Erro: ${error.code}`);
                });
        }
        if (newValues.password) {
            updatePassword(user, newValues.password)
                .then(() => {
                    setMessage2('Senha atualizada!');
                })
                .catch((error) => {
                    // https://firebase.google.com/docs/auth/web/manage-users?hl=pt-br#re-authenticate_a_user
                    if (error.code === 'auth/requires-recent-login')
                        setMessage2(`Necessário relogar para alterar sua senha`);
                    else
                        setMessage2(`Erro: ${error.code}`);
                })
        }
        if (newValues.username === user.displayName && !newValues.password) {
            setMessage('Nada modificado!');
        }
    };

    const deleteAccount = () => {
        deleteUser(user)
            .then(() => {
                setUser(undefined);
                navigate('/', {state: {msg: 'Usuário removido com sucesso!'}});
            })
            .catch((error) => {
                if (error.code === 'auth/requires-recent-login')
                    setMessage2(`Necessário relogar para deletar sua conta`);
                else
                    setMessage2(`Erro: ${error.code}`);
            });
    }

    return (

        <div className={styles.user_container}>
            
            { message && (
                <Message message={message} setMessage={setMessage} time={3000} />
            )}
            { message2 && (
                <Message message={message2} setMessage={setMessage2} time={3000} />
            )}

            <h1>Seus Dados</h1>

            { user && (

                <Formik
                    initialValues={{
                        username: user.displayName || '',
                        password: ''
                    }}
                    validationSchema={yup.object({
                        username: yup.string().min(3, 'o nome possui menos de três caracteres').required('obrigatório'),
                        password: yup.string().min(6, 'a senha possui menos de seis caracteres')
                    })}
                    onSubmit={() => submitForm()}
                >

                    {({values, setFieldValue, setFieldTouched, errors}) => ( <Form>

                        <div className={styles.current}>
                            <p><span>Email:</span> {user.email}</p>
                        </div>

                        <SwitchableInput
                            toogleInput={toogleInput}
                            setFieldTouched={setFieldTouched}
                            formikValue={values.username}
                            showInput={showInput.username}
                            newValue={newValues.username}
                            name='username'
                            type='text'
                            conditionChanged={newValues.username !== user.displayName}
                            conditionOk={!errors.username}
                            textLabel='Nome'
                            textButton='Alterar'
                            newTextLabel='Novo nome'
                            clickOk={() => {
                                setNewValues({ ...newValues, username: values.username });
                                toogleInput('username', setFieldTouched);
                            }}
                            clickCancel={() => {
                                setFieldValue('username', newValues.username);
                                toogleInput('username', setFieldTouched);
                            }}
                        />

                        <SwitchableInput
                            toogleInput={toogleInput}
                            setFieldTouched={setFieldTouched}
                            showInput={showInput.password}
                            newValue=''
                            name='password'
                            type='password'
                            conditionChanged={newValues.password}
                            conditionOk={!errors.password && values.password}
                            textLabel='Senha'
                            textButton='Alterar Senha'
                            newTextLabel='Nova senha'
                            clickOk={() => {
                                setNewValues({ ...newValues, password: values.password });
                                setFieldValue('password', '');
                                toogleInput('password', setFieldTouched);
                            }}
                            clickCancel={() => {
                                setFieldValue('password', '');
                                toogleInput('password', setFieldTouched);
                            }}
                        />
                        
                        <div className={styles.buttons}>
                            <Button type='submit' text='Salvar' />
                            <Button type='button' text='Cancelar' click={() => {
                                    setNewValues({username: user.displayName, password: ''});
                                    setFieldValue('username', user.displayName);
                                    setFieldValue('password', '');
                                    setShowInput({username: false, password: false})
                                }}
                            />
                        </div>

                        <div className={styles.delete_account}>
                            <Button type='button' text='Excluir conta' click={() => deleteAccount()} />
                        </div>

                    </Form> )}

                </Formik>

            )}

        </div>

    );

}

export default User;