import React from 'react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>404!</h1>
        <p>Essa página não existe :&#40;</p>
      </div>
      <Footer />
    </>
  )
}

export default NotFound;