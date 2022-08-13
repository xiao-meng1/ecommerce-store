import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { selectProductById } from '../redux/slices/productsSlice';
import styles from '../styles/storeCard.module.css';

function StoreCard(props) {
  const { id } = props;
  const product = useSelector(selectProductById(id));
  const title = product.name;
  const price = product['MSRP (CAD in cents)'] / 100;
  const imageId = product['image file'];

  const [responseImg, setResponseImg] = useState(null);

  useEffect(() => {
    (async () => {
      const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/products/image/${imageId}`;
      const response = await axios.get(uri, { responseType: 'blob' });

      setResponseImg(response.data);
    })();
  }, []);

  return (
    <Link to="/product" className={styles.link_container}>
      <article className={styles.article} data-testid="card">
        <div className={styles.img_container}>
          {responseImg ? (
            <img
              src={responseImg ? URL.createObjectURL(responseImg) : null}
              alt={title}
              className={styles.img}
            />
          ) : null}
        </div>
        <section className={styles.metadata}>
          <h2 className={styles.h2}>{title}</h2>
          <p className={styles.p}>{`$${price}`}</p>
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
