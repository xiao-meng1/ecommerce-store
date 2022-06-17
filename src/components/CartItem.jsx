import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/cartItem.module.css';

function CartItem(props) {
  const { title, price, fileName, quantity } = props;

  return (
    <section className={styles.section}>
      <img src={`images/${fileName}`} alt={title} />
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>${Number(price) * Number(quantity)}</p>
        <div className={styles.buttons}>
          <button type="button" className={styles.subtract}>
            -
          </button>
          <p>{quantity}</p>
          <button type="button" className={styles.add}>
            +
          </button>
        </div>
      </div>
    </section>
  );
}

CartItem.defaultProps = {
  title: '',
  price: '',
  fileName: '',
  quantity: '',
};

CartItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  fileName: PropTypes.string,
  quantity: PropTypes.string,
};

export default CartItem;
