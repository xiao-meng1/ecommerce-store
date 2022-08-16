import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../styles/storeCard.module.css';

import { selectProductById } from '../redux/slices/productsSlice';

function StoreCard(props) {
  const { id } = props;
  const product = useSelector(selectProductById(id));
  const [responseImg, setResponseImg] = useState(null);

  useEffect(() => {
    (async () => {
      const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/products/image/${product['image file']}`;
      const response = await axios.get(uri, { responseType: 'blob' });

      setResponseImg(response.data);
    })();
  }, []);

  return (
    <Link to={`/product/${id}`} className={styles.link_container}>
      <article className={styles.article} data-testid="card">
        <div className={styles.img_container}>
          {responseImg ? (
            <img
              src={URL.createObjectURL(responseImg)}
              alt={product.name}
              className={styles.img}
            />
          ) : null}
        </div>
        <section className={styles.metadata}>
          <h2 className={styles.h2}>{product.name}</h2>
          <p className={styles.p}>{`$${
            product['MSRP (CAD in cents)'] / 100
          }`}</p>
        </section>
      </article>
    </Link>
  );
}

StoreCard.defaultProps = {
  id: '',
};

StoreCard.propTypes = {
  id: PropTypes.string,
};

export default StoreCard;
