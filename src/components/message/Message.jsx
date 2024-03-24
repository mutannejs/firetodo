import React, { useState, useEffect } from 'react'

import styles from './Message.module.css';

const Message = ({ message, setMessage, time }) => {

  useEffect( () => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage('')
    }, time);
    return () => {
      clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={styles.msg}>{message}</div>
  )
}

export default Message;