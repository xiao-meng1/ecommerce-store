import React from 'react';
import styles from '../styles/quantitySelector.module.css';

function QuantitySelector() {
  return (
    <div className={styles.quantity_selector}>
      <button type="button" disabled>
        &#8211;
      </button>
      <span className={styles.quantity}>1</span>
      <button type="button">+</button>
    </div>
  );
}

export default QuantitySelector;
