function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calcPrices(
  orderItems,
  taxRate = 0.15,
  freeShipping = 100,
  shipping = 10,
  fixed = 2
) {
  // Calculate the items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate the shipping price
  const shippingPrice = addDecimals(itemsPrice > freeShipping ? 0 : shipping);
  // Calculate the tax price
  const taxPrice = addDecimals(Number((taxRate * itemsPrice).toFixed(fixed)));
  // Calculate the total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}
