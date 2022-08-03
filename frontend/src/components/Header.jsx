import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

const productCategories = {
  Games: ['New Releases', 'Upcoming'],
  Hardware: ['Controllers', 'Consoles', 'Accessories'],
  Merchandise: ['Mugs', 'Backpacks', 'Plushies'],
};

function Header() {
  // Todo: move activeCategory to Redux so Overlay component can set it to false.
  const [activeCategory, setActiveCategory] = useState();

  return (
    <header>
      <nav className={styles.main_navbar}>
        <Link to="/" className={styles.left}>
          <h1>Video Game Store</h1>
        </Link>
        <div className={styles.right}>
          <Link to="store" className={styles.red_on_hover}>
            Store
          </Link>
          <Link to="cart" className={styles.red_on_hover}>
            Cart
          </Link>
        </div>
      </nav>
      <nav className={styles.secondary_navbar}>
        <button
          type="button"
          className={styles.red_on_hover}
          onClick={() => {
            setActiveCategory('Hardware');
          }}
        >
          Hardware
        </button>
        <button
          type="button"
          className={styles.red_on_hover}
          onClick={() => {
            setActiveCategory('Games');
          }}
        >
          Games
        </button>
        <button
          type="button"
          className={styles.red_on_hover}
          onClick={() => {
            setActiveCategory('Merchandise');
          }}
        >
          Merchandise
        </button>
      </nav>
      {activeCategory ? (
        <nav className={styles.dropdown_navbar}>
          {productCategories[activeCategory].map((subCategory) => (
            <Link
              to={`/store/${activeCategory}/${subCategory}`}
              onClick={() => {
                setActiveCategory();
              }}
              key={subCategory}
            >
              {subCategory}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export default Header;
