import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/store.module.css';

import StoreCard from '../components/StoreCard';
import { selectProducts } from '../redux/slices/productsSlice';
import fetchProducts from '../redux/thunks/fetchProducts';
import useTestApiConnection from '../hooks/useTestApiConnection';

function Store() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
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

  if (!apiIsConnected) {
    return <div className={styles.loading}>Waiting for API...</div>;
  }

  return (
    <div className={styles.container}>
      {Object.keys(products).map((id) => (
        <StoreCard key={id} id={id} />
      ))}
    </div>
  );
}
export default Store;
