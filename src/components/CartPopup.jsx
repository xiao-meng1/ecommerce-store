import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import styles from '../styles/cartPopup.module.css';

function CartPopup(props) {
  const { cartItems } = props;

  return (
    <div className={styles.popup}>
      <div className={styles.screenBlocker}>Screen Blocker</div>
      <div className={styles.container}>
        <h2>Your shopping cart</h2>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartItem
              key={item.title}
              title={item.title}
              price={item.price}
              fileName={item.fileName}
              quantity={item.quantity}
            />
          ))}
        </div>
        <button type="button" className={`${styles.button} ${styles.checkout}`}>
          Checkout
        </button>
        <button type="button" className={`${styles.button} ${styles.close}`}>
          Close
        </button>
      </div>
    </div>
  );
}

CartPopup.defaultProps = {
  cartItems: [],
};

CartPopup.propTypes = {
  cartItems: [
    {
      title: PropTypes.string,
      price: PropTypes.string,
      fileName: PropTypes.string,
      quantity: PropTypes.string,
    },
  ],
};

export default CartPopup;
