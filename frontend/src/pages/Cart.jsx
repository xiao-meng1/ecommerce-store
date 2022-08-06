import React from 'react';
import CartItem from '../components/CartItem';
import styles from '../styles/cart.module.css';

function Cart() {
  return (
    <div className={styles.cart}>
      <h1>Shopping cart</h1>
      <div className={styles.flex_container}>
        <section className={styles.items}>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </section>
        <form
          className={styles.order_summary}
          action={`${process.env.REACT_APP_BACKEND_ORIGIN}/checkout/create-checkout-session`}
          method="POST"
        >
          <h2>Order summary</h2>
          <p>
            <span>Item&#40;s&#41; summary</span>
            <span>$200.61</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>Free</span>
          </p>
          <p className={styles.total}>
            <span>Estimated total &#40;pre-tax&#41;</span>
            <span>$200.61</span>
          </p>
          <button type="submit" className={styles.checkout}>
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
