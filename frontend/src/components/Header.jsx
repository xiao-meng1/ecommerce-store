import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

function Header() {
  return (
    <header className={styles.header} role="navigation">
      <Link to="/" className={styles.link}>
        <h1 className={styles.h1}>Video Game Store</h1>
      </Link>
      <div className={styles.right}>
        <Link to="store" className={`${styles.link} ${styles.underline}`}>
          Store
        </Link>
        <Link to="cart" className={`${styles.link} ${styles.underline}`}>
          Cart
        </Link>
      </div>
    </header>
  );
}

export default Header;
