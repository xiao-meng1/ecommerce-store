import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/quantitySelector.module.css';

function QuantitySelector(props) {
  const { productStock, quantity, setQuantity } = props;

  const handleIncrementClick = () => {
    if (quantity >= productStock) return;

    setQuantity(quantity + 1);
  };

  const handleDecrementClick = () => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  };

  return (
    <div className={styles.quantity_selector}>
      <button
        type="button"
        onClick={handleDecrementClick}
        disabled={quantity <= 1}
      >
        &#8211;
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button
        type="button"
        onClick={handleIncrementClick}
        disabled={quantity >= productStock}
      >
        +
      </button>
    </div>
  );
}

QuantitySelector.defaultProps = {
  productStock: 0,
  quantity: 1,
  setQuantity: () => {},
};

QuantitySelector.propTypes = {
  productStock: PropTypes.number,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
};

export default QuantitySelector;
