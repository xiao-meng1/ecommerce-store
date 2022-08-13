import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/store.module.css';

import StoreCard from '../components/StoreCard';
import {
  selectProducts,
  selectProductsIsIdle,
} from '../redux/slices/productsSlice';
import fetchProducts from '../redux/thunks/fetchProducts';

function Store() {
  const products = useSelector(selectProducts);
  const productsIsIdle = useSelector(selectProductsIsIdle);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  let productIds = [];

  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');

    if (subcategory && category) {
      dispatch(fetchProducts({ category, subcategory }));
    } else if (category) {
      dispatch(fetchProducts({ category }));
    } else {
      dispatch(fetchProducts());
    }
  }, [searchParams]);

  if (productsIsIdle) {
    productIds = Object.keys(products);
  }

  return (
    <div className={styles.container}>
      {productIds.map((id) => (
        <StoreCard key={id} id={id} />
      ))}
    </div>
  );
}
export default Store;
