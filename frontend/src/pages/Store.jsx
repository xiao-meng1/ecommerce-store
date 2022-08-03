import React from 'react';
import styles from '../styles/store.module.css';
import productData from '../data/products.json';
import StoreCard from '../components/StoreCard';

function Store() {
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
