import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

const productCategories = [
  { main: 'Games', secondary: ['New Releases', 'Upcoming'] },
  {
    main: 'Hardware',
    secondary: ['Controllers', 'Consoles', 'Accessories'],
  },
  { main: 'Merchandise', secondary: ['Mugs', 'Backpacks', 'Plushies'] },
];

function Header() {
  // Todo: move activeCategory to Redux so Overlay component can set it to false.
  const [activeCategory, setActiveCategory] = useState('');

  return (
    <header className={styles.header}>
      <nav className={styles.main_navbar}>
        <div className={styles.left}>
          <button type="button" className={styles.red_on_hover}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <Link to="/" className={styles.logo}>
            <h1>Video Game Store</h1>
          </Link>
        </div>
        <div className={styles.right}>
          <Link to="store" className={styles.red_on_hover}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g />
                <g>
                  <path d="M21.9,8.89l-1.05-4.37c-0.22-0.9-1-1.52-1.91-1.52H5.05C4.15,3,3.36,3.63,3.15,4.52L2.1,8.89 c-0.24,1.02-0.02,2.06,0.62,2.88C2.8,11.88,2.91,11.96,3,12.06V19c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.94 c0.09-0.09,0.2-0.18,0.28-0.28C21.92,10.96,22.15,9.91,21.9,8.89z M18.91,4.99l1.05,4.37c0.1,0.42,0.01,0.84-0.25,1.17 C19.57,10.71,19.27,11,18.77,11c-0.61,0-1.14-0.49-1.21-1.14L16.98,5L18.91,4.99z M13,5h1.96l0.54,4.52 c0.05,0.39-0.07,0.78-0.33,1.07C14.95,10.85,14.63,11,14.22,11C13.55,11,13,10.41,13,9.69V5z M8.49,9.52L9.04,5H11v4.69 C11,10.41,10.45,11,9.71,11c-0.34,0-0.65-0.15-0.89-0.41C8.57,10.3,8.45,9.91,8.49,9.52z M4.04,9.36L5.05,5h1.97L6.44,9.86 C6.36,10.51,5.84,11,5.23,11c-0.49,0-0.8-0.29-0.93-0.47C4.03,10.21,3.94,9.78,4.04,9.36z M5,19v-6.03C5.08,12.98,5.15,13,5.23,13 c0.87,0,1.66-0.36,2.24-0.95c0.6,0.6,1.4,0.95,2.31,0.95c0.87,0,1.65-0.36,2.23-0.93c0.59,0.57,1.39,0.93,2.29,0.93 c0.84,0,1.64-0.35,2.24-0.95c0.58,0.59,1.37,0.95,2.24,0.95c0.08,0,0.15-0.02,0.23-0.03V19H5z" />
                </g>
              </g>
            </svg>
            <p className={styles.md_block}>Store</p>
          </Link>
          <Link to="cart" className={styles.red_on_hover}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <p className={styles.md_block}>Cart</p>
          </Link>
        </div>
      </nav>
      <nav className={styles.secondary_navbar}>
        {productCategories.map((category) => (
          <button
            type="button"
            key={category.main}
            className={styles.red_on_hover}
            onClick={() => {
              setActiveCategory(category.main);
            }}
            style={{
              color: category.main === activeCategory ? 'red' : '',
            }}
          >
            {category.main}
          </button>
        ))}
      </nav>
      {activeCategory ? (
        <nav className={styles.dropdown_navbar}>
          <Link
            to={`/store/${activeCategory}`}
            onClick={() => {
              setActiveCategory('');
            }}
          >
            {`Shop all ${activeCategory}`}
          </Link>
          {productCategories
            .find((x) => x.main === activeCategory)
            .secondary.map((subCategory) => (
              <Link
                to={`/store/${activeCategory}/${subCategory}`}
                onClick={() => {
                  setActiveCategory('');
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
