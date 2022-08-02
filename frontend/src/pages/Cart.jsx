import React from 'react';
import CartItem from '../components/CartItem';
import styles from '../styles/cart.module.css';

const cartItems = [];
const totalPrice = null;

function Cart() {
  return (
    <div className={styles.container} data-testid="cart">
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
      <p>Total: ${totalPrice}</p>
      <form
        action={`${process.env.REACT_APP_BACKEND_ORIGIN}/checkout/create-checkout-session`}
        method="POST"
      >
        <button type="submit" className={`${styles.button} ${styles.checkout}`}>
          Checkout
        </button>
      </form>
      <button type="button" className={`${styles.button} ${styles.close}`}>
        Close
      </button>
    </div>
  );
}

export default Cart;
