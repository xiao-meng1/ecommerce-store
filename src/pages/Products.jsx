import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/products.module.css';
import productData from '../data/products.json';
import Card from '../components/Card';

function Products(props) {
  const { addProductToCart } = props;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {productData.map((item) => (
          <Card
            title={item.title}
            key={item.title}
            price={item.price}
            fileName={item.fileName}
            addProductToCart={addProductToCart}
          />
        ))}
      </div>
    </main>
  );
}

Products.defaultProps = {
  addProductToCart: () => {},
};

Products.propTypes = {
  addProductToCart: PropTypes.func,
};

export default Products;
