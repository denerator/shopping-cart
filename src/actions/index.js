import products from './../API/items.json';
import { LOADING, SUCCES } from '../constans/ActionTypes.js';

export const loadArticle = () => dispatch => {

    dispatch({
        type: LOADING,
    })
    fetch('https://api.myjson.com/bins/r3sq8')
        .then(response => response.json())
        .then(response => dispatch({
            type: SUCCES,
            payload: response
        }))
        .catch(error => console.log(error))
}

