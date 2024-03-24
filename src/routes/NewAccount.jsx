// React, React-router-dom
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// Yup
import * as yup from 'yup';
// Contexts
import { LoginContext } from '../context/LoginContext';
// Componentes
import Message from '../components/message/Message';
import FormAuth from '../components/formauth/FormAuth';

const NewAccount = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(LoginContext);

    const auth = getAuth();

    const handleSubmit = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(userCredencial => {
                const user = userCredencial.user;
                setUser(user);
                return updateProfile(user, {
                    displayName: values.username
                });
            })
            .then(() => {
                navigate('/', {state: {msg: 'Usuário cadastrado com sucesso'}});
            })
            .catch((error) => {
                console.log(`${error.code} -> ${error.message}`);
                if (error.code === 'auth/email-already-in-use')
                    setMessage('Já existe um usuário com esse email cadastrado!');
                else
                    setMessage(`Erro: ${error.code}`);
            });
    };

    return (
        <div>

            { message && (
                <Message message={message} setMessage={setMessage} time={4000} />
            )}

            <h1>Criar Conta</h1>

            <FormAuth
                validationSchema={yup.object({
                    email: yup.string()
                        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'esse não é um email válido')
                        .required('obrigatório'),
                    username: yup.string()
                        .min(3, 'o nome possui menos de três caracteres')
                        .required('obrigatório'),
                    password: yup.string()
                        .min(6, 'a senha possui menos de seis caracteres')
                        .required('obrigatório')
                })}
                initialValues={{
                    email: '',
                    username: '',
                    password: ''
                }}
                username={true}
                handleSubmit={handleSubmit}
                textSubmit='Cadastrar'
                link='/login'
                textNavigate='Já tenho conta'
            />

        </div>
    )
}

export default NewAccount;