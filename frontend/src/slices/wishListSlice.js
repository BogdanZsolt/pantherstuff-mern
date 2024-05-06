import { createSlice } from '@reduxjs/toolkit';
import { updateWishList } from '../utils/wishListUtils';

const initialState = localStorage.getItem('wishList')
  ? JSON.parse(localStorage.getItem('wishList'))
  : { wishListItems: [] };

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;

      const existItem = state.wishListItems.find((x) => x._id === item._id);

      if (!existItem) {
        state.wishListItems = [...state.wishListItems, item];
      }

      return updateWishList(state);
    },
    removeFromWishList: (state, action) => {
      state.wishListItems = state.wishListItems.filter(
        (x) => x._id !== action.payload
      );

      return updateWishList(state);
    },
    toggleWishList: (state, action) => {
      const item = action.payload;

      const existItem = state.wishListItems.find((x) => x._id === item._id);

      if (existItem) {
        state.wishListItems = state.wishListItems.filter(
          (x) => x._id !== item._id
        );
      } else {
        state.wishListItems = [...state.wishListItems, item];
      }

      return updateWishList(state);
    },
  },
});

export const { addToWishList, removeFromWishList, toggleWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;
