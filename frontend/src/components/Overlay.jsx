import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/overlay.module.css';

import {
  selectOverlayIsActive,
  toggleOverlayOff,
} from '../redux/slices/overlaySlice';

function Overlay() {
  const overlayIsActive = useSelector(selectOverlayIsActive);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(toggleOverlayOff());
  };

  if (!overlayIsActive) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="screen overlay"
      className={styles.overlay}
      onClick={handleButtonClick}
    />
  );
}

export default Overlay;
