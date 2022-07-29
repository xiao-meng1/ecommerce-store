import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import styles from '../styles/cartPopup.module.css';

function CartPopup(props) {
  const {
    cartItems,
    onCloseClick,
    onScreenBlockerClick,
    addProductToCart,
    removeProductFromCart,
  } = props;

  const totalPrice = cartItems.reduce(
    (total, item) =>
      Number.parseFloat(
        Number(
          Number.parseFloat(Number(item.price) * item.quantity).toFixed(2)
        ) + Number(total)
      ).toFixed(2),
    0
  );

  return (
    <div className={styles.popup}>
      <button
        type="button"
        onClick={onScreenBlockerClick}
        className={styles.screenBlocker}
      >
        Screen Blocker
      </button>
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
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
            />
          ))}
        </div>
        <p>Total: ${totalPrice}</p>
        <form
          action={`${process.env.REACT_APP_BACKEND_ORIGIN}/checkout/create-checkout-session`}
          method="POST"
        >
          <button
            type="submit"
            className={`${styles.button} ${styles.checkout}`}
          >
            Checkout
          </button>
        </form>
        <button
          type="button"
          onClick={onCloseClick}
          className={`${styles.button} ${styles.close}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}

CartPopup.defaultProps = {
  cartItems: [],
  onCloseClick: () => {},
  onScreenBlockerClick: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
};

CartPopup.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.string,
      fileName: PropTypes.string,
      quantity: PropTypes.number,
    })
  ),
  onCloseClick: PropTypes.func,
  onScreenBlockerClick: PropTypes.func,
  addProductToCart: PropTypes.func,
  removeProductFromCart: PropTypes.func,
};

export default CartPopup;
