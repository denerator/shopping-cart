import { combineReducers } from 'redux';
import items from './itemsReducer';
import filter from './filterReducer';
import cart from './cartReducer';

export default combineReducers({
    items,
    filter,
    cart
}); 

