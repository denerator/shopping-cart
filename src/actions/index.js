import products from './../API/items.json';
import { LOADING, SUCCES, SET_FILTER, SET_SEARCH } from '../constans/ActionTypes.js';

export const loadArticle = () => dispatch => {

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
})