import React from 'react'

import { DiGithubBadge } from "react-icons/di";

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className='footer_theme'>
      <p>
        <strong>FireTodo</strong>, feito por Mutanne JS
      </p>
      <a href="https://github.com/mutannejs/firetodo" target='_blak'>
        <DiGithubBadge />
      </a>
    </footer>
  )
}

export default Footer;