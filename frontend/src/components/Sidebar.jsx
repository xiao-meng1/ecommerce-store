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
    <aside>
      <header>
        <h2>Menu</h2>
      </header>
      {productCategories.map((category) => (
        <section key={category.main}>
          <button
            type="button"
            onClick={() => {
              setActiveCategory(category.main);
            }}
          >
            {category.main}
          </button>
          {activeCategory === category.main ? (
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
        </section>
      ))}
    </aside>
  );
}

export default Sidebar;
