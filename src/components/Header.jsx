import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        <h1 className={styles.h1}>Video Game Store</h1>
      </Link>
      <div className={styles.right}>
        <Link to="/" className={`${styles.link} ${styles.underline}`}>
          Home
        </Link>
        <Link to="products" className={`${styles.link} ${styles.underline}`}>
          Products
        </Link>
        <span className={styles.underline}>Cart</span>
      </div>
    </header>
  );
}

export default Header;
