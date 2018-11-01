import { LOADING, SUCCES, SET_FILTER, SET_SEARCH, ADD_TO_CART, DELETE_FROM_CART } from '../constans/ActionTypes.js';

export const loadItems = () => dispatch => {

    dispatch({
        type: LOADING,
    });
    // fetch('https://api.myjson.com/bins/iegmw')
    //     .then(response => response.json())
    //     .then(response => dispatch({
    //         type: SUCCES,
    //         payload: response
    //     }))
    //     .catch(error => console.log(error))
}

export const setFilter = (name) => ({
    type: SET_FILTER,
    payload: name
});
export const setSearch = searchQuery => ({
    type: SET_SEARCH,
    payload: searchQuery
});
export const addToCart = item => ({
    type: ADD_TO_CART,
    payload: item
});
export const deleteFromCart = id => ({
    type: DELETE_FROM_CART,
    payload: id
});