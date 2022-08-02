import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/storeCard.module.css';

function StoreCard(props) {
  const { title, price, fileName } = props;

  return (
    <Link to="/product">
      <article className={styles.article} data-testid="card">
        <img src={`images/${fileName}`} alt={title} className={styles.img} />
        <section className={styles.section}>
          <h2 className={styles.h2}>{title}</h2>
          <p className={styles.p}>{`$${price}`}</p>
        </section>
      </article>
    </Link>
  );
}

StoreCard.defaultProps = {
  title: '',
  price: '',
  fileName: '',
};

StoreCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  fileName: PropTypes.string,
};

export default StoreCard;
