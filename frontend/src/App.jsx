import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import styles from './styles/app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product" element={<ProductDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
