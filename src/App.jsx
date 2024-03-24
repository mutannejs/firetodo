import { Outlet } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import styles from './App.module.css';

function App() {
  return (
    <>
      <Navbar />
      <main className={`body_theme ${styles.container}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
