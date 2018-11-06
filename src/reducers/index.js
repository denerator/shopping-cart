import { combineReducers } from 'redux';
import items from './itemsReducer';
import filter from './filterReducer';
import cart from './cartReducer';
import user from './userReducer';
import language from './languageReducer';

export default combineReducers({
    items,
    filter,
    cart,
    user,
    language
}); 

