import {
  LOADING_ITEMS,
  SUCCESS,
  SET_FILTER,
  SET_SEARCH,
  ADD_TO_CART,
  DELETE_FROM_CART,
  SET_LANG,
  FETCHING_IP,
  SET_USER,
  ADD_ITEM,
  DELETE_ITEM,
  SET_SIDEBAR_STATE,
} from '../constants/ActionTypes';

export const loadItems = () => (dispatch) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  fetch('https://api.myjson.com/bins/iegmw')
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: `${LOADING_ITEMS}_${SUCCESS}`,
        payload: response,
      });
      localStorage.setItem('localItems', JSON.stringify(response));
    })
    .catch((error) => console.log(error));
};
export const setFilter = (name) => ({
  type: SET_FILTER,
  payload: name,
});
export const setSearch = (searchQuery) => ({
  type: SET_SEARCH,
  payload: searchQuery,
});
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});
export const deleteFromCart = (id) => ({
  type: DELETE_FROM_CART,
  payload: id,
});
export const fetchIP = () => (dispatch) => {
  dispatch({
    type: FETCHING_IP,
  });
  fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((response) =>
      dispatch({
        type: `${FETCHING_IP}_${SUCCESS}`,
        payload:
          response.country_name === 'Ukraine'
            ? 'UA'
            : 'EN',
      })
    )
    .catch((err) => console.log(err));
};
export const setLang = (lang) => ({
  type: SET_LANG,
  payload: lang,
});
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});
export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});
export const setSidebarState = () => ({
  type: SET_SIDEBAR_STATE,
});
