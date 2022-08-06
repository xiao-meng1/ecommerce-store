import React from 'react';
// import PropTypes from 'prop-types';
import QuantitySelector from './QuantitySelector';
import styles from '../styles/cartItem.module.css';

function CartItem() {
  return (
    <section className={styles.cart_item} data-testid="cart-item">
      <div className={styles.left_container}>
        <img
          className={styles.img}
          src="images/animal-crossing-new-horizons-cover.webp"
          alt="product"
        />
        <p>Animal Crossing New Horizons</p>
      </div>
      <div className={styles.right_container}>
        <p className={styles.quantity_text}>Quantity</p>
        <p className={styles.price}>$59.99</p>
        <div className={styles.scale_wrapper}>
          <QuantitySelector />
        </div>
        <button type="button" className={styles.remove_button}>
          Remove
        </button>
      </div>
    </section>
  );
}

// CartItem.defaultProps = {
//   title: '',
//   price: '',
//   fileName: '',
//   quantity: 0,
// };

// CartItem.propTypes = {
//   title: PropTypes.string,
//   price: PropTypes.string,
//   fileName: PropTypes.string,
//   quantity: PropTypes.number,
// };

export default CartItem;
