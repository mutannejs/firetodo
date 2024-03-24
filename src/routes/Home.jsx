// React e React-router-dom
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Firebase
import { query, collection, getDocs, where, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore';
// Contexts
import { LoginContext } from '../context/LoginContext';
// Components
import Todo from '../components/todo/Todo';
import Message from '../components/message/Message';
// Styles
import styles from './Home.module.css';

const Home = ({ db }) => {

    const { user } = useContext(LoginContext);
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    
    useEffect(() => {
        updateTodos();
        if (location.state) {
            setMessage(location.state.msg);
        }
    }, []);

    const updateTodos = () => {
        if (!user) return;
        const q = query(
            collection(db, 'todos'),
            where('uid', '==', user.uid),
            orderBy('completed')
        );
        getDocs(q)
            .then((querySnapshot) => {
                const arrayTodos = [];
                querySnapshot.forEach((todo) => {
                    arrayTodos.push({
                        id: todo.id,
                        todo: todo.data().todo,
                        comment: todo.data().comment,
                        completed: todo.data().completed
                    });
                })
                setTodos(arrayTodos);
            })
            .catch ((error) => {
                setMessage(`Erro ao carregar tarefas: ${error}`)
            });
    }

    const uncheckTodo = (id) => {
        const refDoc = doc( db, 'todos', id );
        updateDoc( refDoc, {
            completed: false
        } )
            .then(() => {
                setMessage('Tarefa desmarcada!');
                updateTodos();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const checkTodo = (id) => {
        const refDoc = doc( db, 'todos', id );
        updateDoc( refDoc, {
            completed: true
        } )
            .then(() => {
                setMessage('Tarefa marcada como concluída!');
                updateTodos();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteTodo = (id) => {
        const refDoc = doc( db, 'todos', id );
        deleteDoc( refDoc )
            .then(() => {
                setMessage('Tarefa removida com sucesso!');
                console.log(`${id} removido`);
                updateTodos();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            { user ? (
                <div>
                    <h1>Suas tarefas</h1>
                    <div className={styles.todos}>
                        { todos.length === 0 ? (
                            <p>Você ainda não possui tarefas</p>
                        ) : (<ul>
                            { todos.map((todo) => (
                                <li key={todo.id}>
                                    <Todo
                                        todo={todo}
                                        checkTodo={checkTodo}
                                        uncheckTodo={uncheckTodo}
                                        deleteTodo={deleteTodo}
                                    />
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                </div> 
            ) : (
                <div className={styles.container}>
                    <h1>FireTodo</h1>
                    <br />
                    <p>Logue-se para ver suas tarefas :&#41;</p>
                    <br />
                    <br />
                </div>
            )}
            { message &&
                <Message message={message} setMessage={setMessage} time={3000} />
            }
        </div>
    )
}

export default Home;