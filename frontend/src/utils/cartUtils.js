export const addDecimals = (num, dec = 2) => {
  return (Math.round(num * 100) / 100).toFixed(dec);
};

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.currentPrice * item.qty,
      0
    ),
    2
  );
  // Calculate Hungarian items price
  state.itemsPrice_hu = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.currentPrice_hu * 0.7874 * item.qty,
      0
    ),
    0
  );
  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10, 2);
  state.shippingPrice_hu = addDecimals(
    state.itemsPrice_hu > 20000 ? 0 : 1990,
    0
  );

  // Calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  state.taxPrice_hu = addDecimals(Number(0.27 * state.itemsPrice_hu), 0);

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  state.totalPrice_hu = (
    Number(state.itemsPrice_hu) +
    Number(state.shippingPrice_hu) +
    Number(state.taxPrice_hu)
  ).toFixed(0);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
