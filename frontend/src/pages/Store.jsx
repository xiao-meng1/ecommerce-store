import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/store.module.css';

import StoreCard from '../components/StoreCard';
import {
  selectProducts,
  selectProductsIsIdle,
} from '../redux/slices/productsSlice';
import fetchProducts from '../redux/thunks/fetchProducts';
import useTestApiConnection from '../hooks/useTestApiConnection';

function Store() {
  const products = useSelector(selectProducts);
  const productsIsIdle = useSelector(selectProductsIsIdle);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productIds = useRef();
  const apiIsConnected = useTestApiConnection();

  useEffect(() => {
    if (!apiIsConnected) return;

    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');

    if (subcategory && category) {
      dispatch(fetchProducts({ category, subcategory }));
    } else if (category) {
      dispatch(fetchProducts({ category }));
    } else {
      dispatch(fetchProducts());
    }
  }, [searchParams, apiIsConnected]);

  if (productsIsIdle) {
    productIds.current = Object.keys(products);
  }

  if (!apiIsConnected) {
    return <div className={styles.loading}>Waiting for API...</div>;
  }

  return (
    <div className={styles.container}>
      {productIds.current.map((id) => (
        <StoreCard key={id} id={id} />
      ))}
    </div>
  );
}
export default Store;
