import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/productDetail.module.css';

import QuantitySelector from '../components/QuantitySelector';
import {
  selectProductById,
  selectProductsIsIdle,
} from '../redux/slices/productsSlice';
import fetchProductById from '../redux/thunks/fetchProductById';

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const [responseImg, setResponseImg] = useState(null);
  const productsIsIdle = useSelector(selectProductsIsIdle);
  const product = useSelector(selectProductById(params.id));

  useEffect(() => {
    dispatch(fetchProductById(params.id));
  }, []);

  useEffect(() => {
    (async () => {
      if (productsIsIdle) {
        const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/products/image/${product['image file']}`;
        const response = await axios.get(uri, { responseType: 'blob' });

        setResponseImg(response.data);
      }
    })();
  }, [productsIsIdle]);

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
            <div className={styles.cart_controls}>
              <QuantitySelector />
              <button type="submit" className={styles.add_to_cart}>
                Add to cart
              </button>
            </div>
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
