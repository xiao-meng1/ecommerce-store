import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

function Header(props) {
  const { onCartClick, cartItems } = props;

  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  return (
    <header className={styles.header} role="navigation">
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
        <button
          type="button"
          onClick={onCartClick}
          className={styles.underline}
        >
          Cart {totalItems !== 0 ? `(${totalItems})` : null}
        </button>
      </div>
    </header>
  );
}

Header.defaultProps = {
  onCartClick: () => {},
  cartItems: [],
};

Header.propTypes = {
  onCartClick: PropTypes.func,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.string,
      fileName: PropTypes.string,
      quantity: PropTypes.number,
    })
  ),
};

export default Header;
