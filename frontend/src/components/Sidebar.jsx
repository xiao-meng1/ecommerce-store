import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/sidebar.module.css';

const productCategories = [
  { main: 'Games', secondary: ['New Releases', 'Upcoming'] },
  {
    main: 'Hardware',
    secondary: ['Controllers', 'Consoles', 'Accessories'],
  },
  { main: 'Merchandise', secondary: ['Mugs', 'Backpacks', 'Plushies'] },
];

function Sidebar() {
  // Todo: move activeCategory to Redux so Overlay component can set it to false.
  const [activeCategory, setActiveCategory] = useState('');

  return (
    <aside className={styles.sticky_container}>
      <div className={styles.sidebar}>
        <header className={styles.header}>
          <h2>Menu</h2>
        </header>
        <nav>
          {productCategories.map((category) => (
            <section key={category.main}>
              <button
                type="button"
                className={styles.category}
                onClick={() => {
                  if (category.main === activeCategory) {
                    setActiveCategory('');
                  } else {
                    setActiveCategory(category.main);
                  }
                }}
              >
                <p>{category.main}</p>
                {category.main === activeCategory ? (
                  <img
                    src="images/icons/expand_less_black_24dp.svg"
                    alt="expand less icon"
                  />
                ) : (
                  <img
                    src="images/icons/expand_more_black_24dp.svg"
                    alt="expand more icon"
                  />
                )}
              </button>
              {activeCategory === category.main ? (
                <>
                  <Link
                    to={`/store/${activeCategory}`}
                    className={styles.subcategory}
                    onClick={() => {
                      setActiveCategory('');
                    }}
                  >
                    <p>{`Shop all ${activeCategory}`}</p>
                    <img
                      src="images/icons/navigate_next_black_24dp.svg"
                      alt="navigate next icon"
                    />
                  </Link>
                  {productCategories
                    .find((x) => x.main === activeCategory)
                    .secondary.map((subCategory) => (
                      <Link
                        to={`/store/${activeCategory}/${subCategory}`}
                        className={styles.subcategory}
                        onClick={() => {
                          setActiveCategory('');
                        }}
                        key={subCategory}
                      >
                        <p>{subCategory}</p>
                        <img
                          src="images/icons/navigate_next_black_24dp.svg"
                          alt="navigate next icon"
                        />
                      </Link>
                    ))}
                </>
              ) : null}
            </section>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
