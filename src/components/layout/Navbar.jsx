import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { LoginContext } from '../../context/LoginContext';

import styles from './Navbar.module.css';

const Navbar = () => {

  const { user, setUser } = useContext(LoginContext);

  const navigate = useNavigate();

  const logout = () => {
    setUser(undefined);
    navigate('/');
  }

  return (
    <nav className='navbar_theme'>
      <div className={styles.title}>
        <Link to='/'><h1>FireTodo</h1></Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          { user && (
            <li>
              <Link to='/newtodo'>Nova tarefa</Link>
            </li>
          )}
          { user ? (
            <li className={styles.auth}>
              <Link to='/user'>
                {user.displayName || user.email}
              </Link>
              <ul className={styles.exit}>
                <li onClick={logout}>
                  Sair
                </li>
              </ul>
            </li>
          ) : (
            <li>
            <Link to='/login'>Entrar</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;