import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/card.module.css';

function Card(props) {
  const { title, price, fileName, addProductToCart } = props;
  const handleAddButtonClick = () => {
    addProductToCart(title);
  };

  return (
    <article className={styles.article} data-testid="card">
      <img src={`images/${fileName}`} alt={title} className={styles.img} />
      <section className={styles.section}>
        <h2 className={styles.h2}>{title}</h2>
        <p className={styles.p}>{`$${price}`}</p>
        <button
          type="button"
          onClick={handleAddButtonClick}
          className={styles.button}
        >
          Add to cart
        </button>
      </section>
    </article>
  );
}

Card.defaultProps = {
  title: '',
  price: '',
  fileName: '',
  addProductToCart: () => {},
};

Card.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  fileName: PropTypes.string,
  addProductToCart: PropTypes.func,
};

export default Card;
