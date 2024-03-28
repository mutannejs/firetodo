// React, React-router-dom, React-icons
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
// Firebase
import { query, collection, getDocs, where, deleteDoc, doc, updateDoc, orderBy, writeBatch } from 'firebase/firestore';
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
    const [showOrder, setShowOrder] = useState(false);
    const [indexOrder, setIndexOrder] = useState();
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
            orderBy('completed'),
            orderBy('order', 'desc')
        );
        getDocs(q)
            .then((querySnapshot) => {
                const arrayTodos = [];
                querySnapshot.forEach((todo) => {
                    arrayTodos.push({
                        id: todo.id,
                        todo: todo.data().todo,
                        comment: todo.data().comment,
                        completed: todo.data().completed,
                        order: todo.data().order
                    });
                })
                setTodos(arrayTodos);
            })
            .then(() => {
                console.log('todos carregados');
            })
            .catch ((error) => {
                setMessage(`Erro ao carregar tarefas: ${error}`);
                console.log(`Erro ao carregar tarefas: ${error}`);
            });
    }

    const uncheckTodo = (id) => {
        const refDoc = doc( db, 'todos', id );
        updateDoc( refDoc, {
            completed: false
        } )
            .then(() => {
                updateTodos();
                setMessage('Tarefa desmarcada!');
                console.log(`${id} desmarcada`);
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
                updateTodos();
                setMessage('Tarefa marcada como concluída!');
                console.log(`${id} marcado como condluída`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteTodo = (id) => {
        const refDoc = doc( db, 'todos', id );
        deleteDoc( refDoc )
            .then(() => {
                updateTodos();
                setMessage('Tarefa removida com sucesso!');
                console.log(`${id} removida`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const toogleOrder = (index) => {
        const numUnchecked = todos.filter(t => !t.completed).length;
        if ( numUnchecked <= 1 || index >= numUnchecked )
            return;
        setShowOrder(prev => !prev);
        setIndexOrder(index);
    }

    const changeOrder = (id, currentOrder, newOrder) => {
        setShowOrder(prev => !prev); // esconde o input
        const changedTodo = todos.find(t => t.id === id); // todo que teve a ordem alterada
        let todosUn = todos.filter(t => !t.completed); // array com todos os todos não marcados
        const lenUn = todosUn.length; // quantidade de todos não marcados

        // se a ordem onde deseja inserir o elemento não pode ser acessada
        if (newOrder === currentOrder || newOrder === currentOrder + 1 || newOrder < 0 || newOrder > lenUn)
            return;

        // reposiciona os itens no vetor
        if (newOrder > currentOrder)
            newOrder -= 1;
        todosUn = todosUn.filter( t => t.id !== id );
        todosUn.splice( newOrder, 0, changedTodo );
        todosUn = todosUn.map( (t, i) => { return {...t, order: lenUn - i - 1} } );

        // atualiza os todos que tiveram a ordem alterada
        const batch = writeBatch(db);
        todosUn.forEach((t) => {
            const refDoc = doc( db, 'todos', t.id );
            batch.update( refDoc, {
                order: t.order
            })
        })
        batch.commit()
            .then(() => { updateTodos(); })
            .catch(()=> console.log('erro na atualização de vários documentos'));
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
                            { todos.map((todo, index) => (
                                <li key={todo.id}>
                                    { showOrder && index <= todos.filter(t => !t.completed).length && (
                                        <div className={styles.separate}>
                                            <hr />
                                            <p>{index}</p>
                                            <hr />
                                        </div>
                                    )}
                                    <div className={styles.todo}>
                                        <div className={styles.order} onClick={() => toogleOrder(index)}>
                                            { showOrder && indexOrder === index ? (
                                                <input type="number" onKeyDown={(e) => {
                                                    if (e.key == 'Enter') changeOrder(todo.id, index, parseInt(e.target.value))
                                                }} autoFocus onBlur={() => toogleOrder(index)} />
                                            ) : (
                                                <BsThreeDotsVertical />
                                            )}
                                        </div>
                                        <Todo
                                            todo={todo}
                                            checkTodo={checkTodo}
                                            uncheckTodo={uncheckTodo}
                                            deleteTodo={deleteTodo}
                                        />
                                    </div>
                                </li>
                            ))}
                            { showOrder && todos[todos.length-1].completed === false && (
                                <div className={styles.separate}>
                                    <hr />
                                        <p>{todos.length}</p>
                                    <hr />
                                </div>
                            )}
                        </ul> )}
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