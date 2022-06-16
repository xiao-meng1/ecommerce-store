import React from 'react';
import styles from '../styles/products.module.css';
import products from '../data/products.json';
import Card from '../components/Card';

function Products() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {products.map((item) => (
          <Card
            title={item.title}
            key={item.title}
            price={item.price}
            fileName={item.fileName}
          />
        ))}
      </div>
    </main>
  );
}

export default Products;
