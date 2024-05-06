export const updateWishList = (state) => {
  localStorage.setItem('wishList', JSON.stringify(state));

  return state;
};
