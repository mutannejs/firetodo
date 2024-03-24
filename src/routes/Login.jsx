// React, React-router-dom
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Yup
import * as yup from 'yup';
// Contexts
import { LoginContext } from '../context/LoginContext';
// Componentes
import Message from '../components/message/Message';
import FormAuth from '../components/formauth/FormAuth';

const Login = () => {

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(LoginContext);

  const auth = getAuth();

  const handleSubmit = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredencial) => {
        const user = userCredencial.user;
        setUser(user);
        navigate('/');
      })
      .catch((error) => {
        console.log(`${error.code} -> ${error.message}`);
        if (error.code === 'auth/invalid-credential')
          setMessage('Email ou senha inválidos!');
        else
          setMessage(`Erro: ${error.code}`);
      });
  };

  return (
    <div>

      {message && (
        <Message message={message} setMessage={setMessage} time={4000} />
      )}

      <h1>Entrar no FireTodo</h1>

      <FormAuth
        validationSchema={yup.object({
          email: yup.string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'esse não é um email válido')
            .required('obrigatório'),
          password: yup.string()
            .min(6, 'a senha possui menos de seis caracteres')
            .required('obrigatório')
        })}
        initialValues={{
          email: '',
          password: ''
        }}
        username={false}
        handleSubmit={handleSubmit}
        textSubmit='Entrar'
        link='/newaccount'
        textNavigate='Não tenho conta'
      />

    </div>
  )
}

export default Login;