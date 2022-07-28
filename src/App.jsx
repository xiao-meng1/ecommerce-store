import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import structuredClone from 'core-js-pure/actual/structured-clone';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import CartPopup from './components/CartPopup';
import productData from './data/products.json';
import styles from './styles/app.module.css';

function App() {
  const [cartPopupActive, setCartPopupActive] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCartPopupActive = () => {
    setCartPopupActive((state) => !state);
  };

  const addProductToCart = (title) => {
    const cartItemsClone = structuredClone(cartItems);
    const productInCart = cartItemsClone.find(
      (product) => product.title === title
    );

    if (productInCart) {
      productInCart.quantity += 1;
      setCartItems(cartItemsClone);

      return;
    }

    const { price, fileName } = productData.find(
      (product) => product.title === title
    );
    const newProduct = {
      title,
      price,
      fileName,
      quantity: 1,
    };

    setCartItems((state) => [...state, newProduct]);
  };

  const removeProductFromCart = (title) => {
    const cartItemsClone = structuredClone(cartItems);
    const productInCart = cartItemsClone.find(
      (product) => product.title === title
    );

    if (productInCart.quantity === 1) {
      const index = cartItemsClone.indexOf(productInCart);
      cartItemsClone.splice(index, 1);
      setCartItems(cartItemsClone);

      return;
    }

    productInCart.quantity -= 1;
    setCartItems(cartItemsClone);
  };

  return (
    <div className={styles.app}>
      <HashRouter>
        <Header onCartClick={toggleCartPopupActive} cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Products addProductToCart={addProductToCart} />}
          />
        </Routes>
      </HashRouter>
      {cartPopupActive ? (
        <CartPopup
          cartItems={cartItems}
          onCloseClick={toggleCartPopupActive}
          onScreenBlockerClick={toggleCartPopupActive}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
        />
      ) : null}
    </div>
  );
}

export default App;
