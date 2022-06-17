import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import CartPopup from './components/CartPopup';
import styles from './styles/app.module.css';

function App() {
  const [cartPopupActive] = useState(true);
  const [cartItems] = useState([
    {
      title: 'Animal Crossing: New Horizons',
      price: '79.99',
      fileName: 'animal-crossing-new-horizons-cover.webp',
      quantity: '1',
    },
    {
      title: 'Dark Souls: Remastered',
      price: '79.99',
      fileName: 'dark-souls-remastered-cover.cover_300x.jpg',
      quantity: '1',
    },
    {
      title: 'Fire Emblem: Three Houses',
      price: '69.99',
      fileName: 'fire-emblem-three-houses-cover.cover_300x.jpg',
      quantity: '1',
    },
    {
      title: 'Animal Crossing: New Horizons',
      price: '79.99',
      fileName: 'animal-crossing-new-horizons-cover.webp',
      quantity: '1',
    },
    {
      title: 'Dark Souls: Remastered',
      price: '79.99',
      fileName: 'dark-souls-remastered-cover.cover_300x.jpg',
      quantity: '1',
    },
    {
      title: 'Fire Emblem: Three Houses',
      price: '69.99',
      fileName: 'fire-emblem-three-houses-cover.cover_300x.jpg',
      quantity: '1',
    },
  ]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
      {cartPopupActive ? <CartPopup cartItems={cartItems} /> : null}
    </div>
  );
}

export default App;
