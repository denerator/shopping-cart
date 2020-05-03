import { ADD_TO_CART, DELETE_FROM_CART } from '../constants/ActionTypes';

let initialState = null;
if (localStorage.getItem('cart') !== null) {
  initialState = JSON.parse(localStorage.getItem('cart'));
} else {
  initialState = [];
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      localStorage.setItem('cart', JSON.stringify([...state, action.payload]));
      return [...state, action.payload];
    case DELETE_FROM_CART:
      localStorage.setItem(
        'cart',
        JSON.stringify(state.filter((item) => item.id !== action.payload))
      );
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}
