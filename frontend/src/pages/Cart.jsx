import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/cart.module.css';

import CartItem from '../components/CartItem';
import { selectCartItems } from '../redux/slices/cartSlice';
import { selectProducts } from '../redux/slices/productsSlice';
import fetchProducts from '../redux/thunks/fetchProducts';
import fetchProductById from '../redux/thunks/fetchProductById';

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const products = useSelector(selectProducts);
  const [newProductsLoaded, setNewProductsLoaded] = useState(false);
  const mounted = useRef();
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    const priceInCents = cartItems.reduce(
      (total, cartItem) =>
        total +
        cartItem.quantity * products[cartItem.id][`MSRP (CAD in cents)`],
      0
    );

    return priceInCents / 100;
  };

  useEffect(() => {
    if (cartItems.length === 1) {
      dispatch(fetchProductById(cartItems[0].id));
    } else if (cartItems.length >= 1) {
      dispatch(fetchProducts({ ids: cartItems.map((item) => item.id) }));
    }
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setNewProductsLoaded(true);
    }
  }, [products]);

  if (cartItems.length === 0) {
    return <p className={styles.empty_cart}>Your cart is empty.</p>;
  }

  return (
    <div className={styles.cart}>
      <h1>Shopping cart</h1>
      <div className={styles.flex_container}>
        <section className={styles.items}>
          {cartItems.map((item) => (
            <CartItem id={item.id} key={item.id} />
          ))}
        </section>
        {!newProductsLoaded ? null : (
          <form
            className={styles.order_summary}
            action={`${process.env.REACT_APP_BACKEND_ORIGIN}/checkout/create-checkout-session`}
            method="POST"
          >
            <h2>Order summary</h2>
            <p>
              <span>Item&#40;s&#41; summary</span>
              <span>${calculateTotalPrice()}</span>
            </p>
            <p>
              <span>Shipping</span>
              <span>Free</span>
            </p>
            <p className={styles.total}>
              <span>Estimated total &#40;pre-tax&#41;</span>
              <span>${calculateTotalPrice()}</span>
            </p>
            <button type="submit" className={styles.checkout}>
              Checkout
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Cart;
