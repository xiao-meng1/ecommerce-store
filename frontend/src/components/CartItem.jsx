import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from '../styles/cartItem.module.css';

import QuantitySelector from './QuantitySelector';
import {
  selectCartItemById,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItem,
} from '../redux/slices/cartSlice';
import { selectProductById } from '../redux/slices/productsSlice';

function CartItem(props) {
  const { id } = props;
  const cartItem = useSelector(selectCartItemById(id));
  const product = useSelector(selectProductById(id));
  const [responseImg, setResponseImg] = useState(null);
  const dispatch = useDispatch();

  const setQuantity = (newQuantity) => {
    if (newQuantity === cartItem.quantity + 1) {
      dispatch(incrementItemQuantity(id));
    } else if (newQuantity === cartItem.quantity - 1) {
      dispatch(decrementItemQuantity(id));
    }
  };

  const handleRemoveButton = () => {
    dispatch(removeItem(id));
  };

  useEffect(() => {
    (async () => {
      if (!product) return;

      const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/products/image/${product['image file']}`;
      const response = await axios.get(uri, { responseType: 'blob' });

      setResponseImg(response.data);
    })();
  }, [product]);

  if (!product) {
    return <div />;
  }

  return (
    <section className={styles.cart_item} data-testid="cart-item">
      <div className={styles.left_container}>
        <div className={styles.img_container}>
          {responseImg ? (
            <img
              className={styles.img}
              src={URL.createObjectURL(responseImg)}
              alt="product"
            />
          ) : null}
        </div>
        <p className={styles.product_name}>{product.name}</p>
      </div>
      <div className={styles.right_container}>
        <p className={styles.quantity_text}>Quantity</p>
        <p className={styles.price}>
          ${(product[`MSRP (CAD in cents)`] * cartItem.quantity) / 100}
        </p>
        <div className={styles.scale_wrapper}>
          <QuantitySelector
            quantity={cartItem.quantity}
            setQuantity={setQuantity}
            productStock={product.stock}
          />
        </div>
        <button
          type="button"
          className={styles.remove_button}
          onClick={handleRemoveButton}
        >
          Remove
        </button>
      </div>
    </section>
  );
}

CartItem.defaultProps = {
  id: '',
};

CartItem.propTypes = {
  id: PropTypes.string,
};

export default CartItem;
