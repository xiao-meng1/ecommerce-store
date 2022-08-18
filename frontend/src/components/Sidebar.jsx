import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/sidebar.module.css';

import {
  selectOverlayIsActive,
  toggleOverlayOff,
} from '../redux/slices/overlaySlice';
import expandLessIcon from '../assets/icons/expand_less_black_24dp.svg';
import expandMoreIcon from '../assets/icons/expand_more_black_24dp.svg';
import navigateNextIcon from '../assets/icons/navigate_next_black_24dp.svg';

const productCategories = [
  { main: 'Games', secondary: ['New Releases', 'Upcoming'] },
  {
    main: 'Hardware',
    secondary: ['Controllers', 'Consoles', 'Accessories'],
  },
  { main: 'Merchandise', secondary: ['Mugs', 'Backpacks', 'Plushies'] },
];

function Sidebar() {
  const overlayIsActive = useSelector(selectOverlayIsActive);
  const dispatch = useDispatch();

  const [activeCategory, setActiveCategory] = useState('');

  if (!overlayIsActive) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sticky_container}>
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
                  <img src={expandLessIcon} alt="expand less icon" />
                ) : (
                  <img src={expandMoreIcon} alt="expand more icon" />
                )}
              </button>
              {activeCategory === category.main ? (
                <>
                  <Link
                    to={`/store?category=${activeCategory}`}
                    className={styles.subcategory}
                    onClick={() => {
                      setActiveCategory('');
                      dispatch(toggleOverlayOff());
                    }}
                  >
                    <p>{`Shop all ${activeCategory}`}</p>
                    <img src={navigateNextIcon} alt="navigate next icon" />
                  </Link>
                  {productCategories
                    .find((x) => x.main === activeCategory)
                    .secondary.map((subCategory) => (
                      <Link
                        to={`/store?category=${activeCategory}&subcategory=${subCategory}`}
                        className={styles.subcategory}
                        onClick={() => {
                          setActiveCategory('');
                          dispatch(toggleOverlayOff());
                        }}
                        key={subCategory}
                      >
                        <p>{subCategory}</p>
                        <img src={navigateNextIcon} alt="navigate next icon" />
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
