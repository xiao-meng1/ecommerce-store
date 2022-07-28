import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Cart rendering/unrendering', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('App does not render the cart initially', () => {
    const cart = screen.queryByTestId('cart');
    expect(cart).toBeNull();
  });

  test('App renders cart after clicking on "Cart" in the header', async () => {
    const header = screen.getByRole('navigation');
    const cartButton = within(header).getByText(/cart/i);
    await userEvent.click(cartButton);

    const cart = screen.queryByTestId('cart');
    expect(cart).not.toBeNull();
  });

  test('App unrenders cart after clicking on the "Close" button in Cart', async () => {
    const header = screen.getByRole('navigation');
    const cartButton = within(header).getByText(/cart/i);
    await userEvent.click(cartButton);

    const cartQuery1 = screen.queryByTestId('cart');
    const closeButton = within(cartQuery1).getByText(/close/i);
    await userEvent.click(closeButton);

    const cartQuery2 = screen.queryByTestId('cart');
    expect(cartQuery2).toBeNull();
  });
});

describe('Cart functionality', () => {
  beforeEach(async () => {
    render(<App />);
    const header = screen.getByRole('navigation');
    const productsLink = within(header).getByText(/products/i);
    await userEvent.click(productsLink);
  });

  test('can add an item to cart using "Add To Cart" button', async () => {
    const cards = screen.getAllByTestId('card');
    const cardTitles = cards.map((card) => within(card).getByRole('heading'));
    const addToCartButtons = cards.map((card) =>
      within(card).getByText(/add to cart/i)
    );
    await userEvent.click(addToCartButtons[0]);

    const header = screen.getByRole('navigation');
    const cartButton = within(header).getByText(/cart/i);
    await userEvent.click(cartButton);

    const cart = screen.queryByTestId('cart');
    const cartItems = within(cart).getAllByTestId('cart-item');
    const cartItemTitles = cartItems.map((item) =>
      within(item).getByRole('heading')
    );
    expect(cardTitles[0].textContent).toMatch(cartItemTitles[0].textContent);
  });

  test('can add a multiple items to cart using different "Add To Cart" buttons', async () => {
    const cards = screen.getAllByTestId('card');
    const cardTitles = cards.map((card) => within(card).getByRole('heading'));
    const addToCartButtons = cards.map((card) =>
      within(card).getByText(/add to cart/i)
    );
    await userEvent.click(addToCartButtons[0]);
    await userEvent.click(addToCartButtons[1]);
    await userEvent.click(addToCartButtons[2]);

    const header = screen.getByRole('navigation');
    const cartButton = within(header).getByText(/cart/i);
    await userEvent.click(cartButton);

    const cart = screen.queryByTestId('cart');
    const cartItems = within(cart).getAllByTestId('cart-item');
    const cartItemTitles = cartItems.map((item) =>
      within(item).getByRole('heading')
    );
    expect(cardTitles[0].textContent).toMatch(cartItemTitles[0].textContent);
    expect(cardTitles[1].textContent).toMatch(cartItemTitles[1].textContent);
    expect(cardTitles[2].textContent).toMatch(cartItemTitles[2].textContent);
  });

  test('can increase quantity using "+" button', async () => {
    const cards = screen.getAllByTestId('card');
    const addToCartButtons = cards.map((card) =>
      within(card).getByText(/add to cart/i)
    );
    await userEvent.click(addToCartButtons[0]);

    const header = screen.getByRole('navigation');
    const cartButton = within(header).getByText(/cart/i);
    await userEvent.click(cartButton);

    const cart = screen.queryByTestId('cart');
    const cartItems = within(cart).getAllByTestId('cart-item');
    const cartItemAddButton = within(cartItems[0]).getByText('+');
    const cartItemQuantity = within(cartItems[0]).queryByText('1');
    expect(cartItemQuantity).not.toBeNull();
    await userEvent.click(cartItemAddButton);

    expect(cartItemQuantity.textContent).toBe('2');
  });

  test('can decrease quantity using "-" button', async () => {
    const cards = screen.getAllByTestId('card');
    const addToCartButtons = cards.map((card) =>
      within(card).getByText(/add to cart/i)
    );
    await userEvent.click(addToCartButtons[0]);
    await userEvent.click(addToCartButtons[0]);

    const header = screen.getByRole('navigation');
    const cartButton = within(header).getByText(/cart/i);
    await userEvent.click(cartButton);

    const cart = screen.queryByTestId('cart');
    const cartItems = within(cart).getAllByTestId('cart-item');
    const cartItemSubtractButton = within(cartItems[0]).getByText('-');
    const cartItemQuantity = within(cartItems[0]).queryByText('2');
    expect(cartItemQuantity).not.toBeNull();
    await userEvent.click(cartItemSubtractButton);

    expect(cartItemQuantity.textContent).toBe('1');
  });

  test('can remove item using "-" button if quantity was 1', async () => {
    const cards = screen.getAllByTestId('card');
    const addToCartButtons = cards.map((card) =>
      within(card).getByText(/add to cart/i)
    );
    await userEvent.click(addToCartButtons[0]);

    const header = screen.getByRole('navigation');
    const cartButton = within(header).getByText(/cart/i);
    await userEvent.click(cartButton);

    const cart = screen.queryByTestId('cart');
    const cartItems = within(cart).getAllByTestId('cart-item');
    const cartItemSubtractButton = within(cartItems[0]).getByText('-');
    const cartItemQuantity = within(cartItems[0]).queryByText('1');
    expect(cartItemQuantity).not.toBeNull();
    await userEvent.click(cartItemSubtractButton);

    const newCartItems = within(cart).queryAllByTestId('cart-item');
    expect(newCartItems).toStrictEqual([]);
  });
});
