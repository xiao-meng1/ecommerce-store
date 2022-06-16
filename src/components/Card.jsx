import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/card.module.css';

function Card(props) {
  const { title, price, fileName } = props;

  return (
    <article className={styles.article}>
      <img src={`images/${fileName}`} alt={title} />
      <section>
        <h2>{title}</h2>
        <p>{`$${price}`}</p>
      </section>
    </article>
  );
}

Card.defaultProps = {
  title: '',
  price: '',
  fileName: '',
};

Card.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  fileName: PropTypes.string,
};

export default Card;
