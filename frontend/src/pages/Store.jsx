import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import StoreCard from '../components/StoreCard';
import fetchProductImageById from '../redux/thunks/fetchProductImageById';
import styles from '../styles/store.module.css';
import productData from '../data/products.json';
import fetchProductById from '../redux/thunks/fetchProductById';

function Store() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductById('62e85971695d3d2ea457daf7'));
    dispatch(
      fetchProductImageById({
        productId: '62e85971695d3d2ea457daf7',
        imageId: '62e85971695d3d2ea457daea',
      })
    );
  });

  return (
    <div className={styles.container}>
      {productData.map((item) => (
        <StoreCard
          title={item.title}
          key={item.title}
          price={item.price}
          fileName={item.fileName}
        />
      ))}
    </div>
  );
}
export default Store;
