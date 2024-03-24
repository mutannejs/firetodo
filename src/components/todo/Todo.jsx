import React from 'react';
import { RiCheckboxLine, RiSquareLine, RiDeleteBin6Line } from 'react-icons/ri';

import styles from './Todo.module.css';

const Todo = ({ todo, uncheckTodo, checkTodo, deleteTodo }) => {

    return (
        <div className={`${styles.todo} ${todo.completed && styles.completed}`}>
            <div className={styles.static}>
                <p>
                    {todo.todo}
                </p>
                <div className={styles.buttons}>
                    <button
                        className={styles.btn_check}
                        onClick={() => {
                            todo.completed ? uncheckTodo(todo.id) : checkTodo(todo.id)
                        }}
                    >
                        { todo.completed ? (
                            <RiCheckboxLine />
                        ) : (
                            <RiSquareLine />
                        )}
                    </button>
                    <button
                        className={styles.btn_delete}
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </div>
            <div className={styles.comment}>
                <span>Comentário: </span> {todo.comment}
            </div>
        </div>
    )
}

export default Todo;