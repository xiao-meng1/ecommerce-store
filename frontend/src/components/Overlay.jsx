import React from 'react';
import styles from '../styles/overlay.module.css';

function Overlay() {
  return (
    <button
      type="button"
      aria-label="screen overlay"
      className={styles.overlay}
    />
  );
}

export default Overlay;
