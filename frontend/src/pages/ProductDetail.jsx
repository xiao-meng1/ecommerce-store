import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/productDetail.module.css';

import QuantitySelector from '../components/QuantitySelector';
import { selectProductById } from '../redux/slices/productsSlice';
import {
  addItem,
  incrementItemQuantityByAmount,
  selectCartItemById,
} from '../redux/slices/cartSlice';
import fetchProductById from '../redux/thunks/fetchProductById';
import useTestApiConnection from '../hooks/useTestApiConnection';

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();

  const [responseImg, setResponseImg] = useState(null);
  const product = useSelector(selectProductById(params.id));
  const itemInCart = useSelector(
    selectCartItemById(product ? product._id : '')
  );
  const [quantity, setQuantity] = useState(1);
  const apiIsConnected = useTestApiConnection();

  useEffect(() => {
    if (!apiIsConnected) return;

    dispatch(fetchProductById(params.id));
  }, [apiIsConnected]);

  useEffect(() => {
    (async () => {
      if (product) {
        const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/products/image/${product['image file']}`;
        const response = await axios.get(uri, { responseType: 'blob' });

        setResponseImg(response.data);
      }
    })();
  }, [product]);

  const handleAddToCart = () => {
    if (itemInCart) {
      if (itemInCart.quantity + quantity > product.stock) return;

      dispatch(
        incrementItemQuantityByAmount({ id: product._id, amount: quantity })
      );
    } else {
      dispatch(addItem({ id: product._id, quantity }));
    }
  };

  if (!apiIsConnected) {
    return <div className={styles.loading}>Waiting for API...</div>;
  }

  if (!product) {
    return <div />;
  }

  return (
    <>
      <section className={styles.top_container}>
        <p className={styles.route}>
          Store &#62; {product.category} &#62; {product.subcategory} &#62;{' '}
          <strong>{product.name}</strong>
        </p>
        <div className={styles.flex_container}>
          <div className={styles.img_container}>
            {responseImg ? (
              <img
                className={styles.product}
                src={responseImg ? URL.createObjectURL(responseImg) : null}
                alt="product"
              />
            ) : null}
          </div>
          <div className={styles.product_info}>
            <p>{product.name}</p>
            <p>${product['MSRP (CAD in cents)'] / 100}</p>
            {product ? (
              <div className={styles.cart_controls}>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  productStock={product.stock}
                />

                <button
                  type="submit"
                  className={styles.add_to_cart}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <section className={styles.bottom_container}>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.img_container}>
          {responseImg ? (
            <img
              className={styles.product}
              src={responseImg ? URL.createObjectURL(responseImg) : null}
              alt="product"
            />
          ) : null}
        </div>
      </section>
      <div className={styles.hero_backdrop} />
    </>
  );
}
export default ProductDetail;
