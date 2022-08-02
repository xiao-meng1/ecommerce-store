import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

function Header() {
  return (
    <header>
      <nav className={styles.main_navbar}>
        <Link to="/" className={styles.left}>
          <h1>Video Game Store</h1>
        </Link>
        <div className={styles.right}>
          <Link to="store" className={styles.red_on_hover}>
            Store
          </Link>
          <Link to="cart" className={styles.red_on_hover}>
            Cart
          </Link>
        </div>
      </nav>
      <nav className={styles.secondary_navbar}>
        <button type="button" className={styles.red_on_hover}>
          Games
        </button>
        <button type="button" className={styles.red_on_hover}>
          Hardware
        </button>
        <button type="button" className={styles.red_on_hover}>
          Merchandise
        </button>
      </nav>
    </header>
  );
}

export default Header;
