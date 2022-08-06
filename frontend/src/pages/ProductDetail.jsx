import React from 'react';
import QuantitySelector from '../components/QuantitySelector';
import styles from '../styles/productDetail.module.css';

function ProductDetail() {
  return (
    <>
      <section className={styles.top_container}>
        <p className={styles.route}>
          Product Name Store &#62; Games &#62; <strong>Product Name</strong>
        </p>
        <div className={styles.flex_container}>
          <img
            className={styles.product}
            src="images/animal-crossing-new-horizons-cover.webp"
            alt="product"
          />
          <div className={styles.product_info}>
            <p>Mario 10 inch Plush</p>
            <p>$12.99</p>
            <div className={styles.cart_controls}>
              <QuantitySelector />
              <button type="submit" className={styles.add_to_cart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.bottom_container}>
        <p className={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <img
          className={styles.product}
          src="images/animal-crossing-new-horizons-cover.webp"
          alt="product"
        />
      </section>
      <div className={styles.hero_backdrop} />
    </>
  );
}
export default ProductDetail;
