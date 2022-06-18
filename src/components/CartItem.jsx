import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/cartItem.module.css';

function CartItem(props) {
  const {
    title,
    price,
    fileName,
    quantity,
    addProductToCart,
    removeProductFromCart,
  } = props;
  const handleAddButtonClick = () => {
    addProductToCart(title);
  };
  const handleSubtractButtonClick = () => {
    removeProductFromCart(title);
  };

  return (
    <section className={styles.section} data-testid="cart-item">
      <img src={`images/${fileName}`} alt={title} />
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>${Number.parseFloat(Number(price) * Number(quantity)).toFixed(2)}</p>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleSubtractButtonClick}
            className={styles.subtract}
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            type="button"
            onClick={handleAddButtonClick}
            className={styles.add}
          >
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
  quantity: 0,
  addProductToCart: '',
  removeProductFromCart: '',
};

CartItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  fileName: PropTypes.string,
  quantity: PropTypes.number,
  addProductToCart: PropTypes.func,
  removeProductFromCart: PropTypes.func,
};

export default CartItem;
