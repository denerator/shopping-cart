import { combineReducers } from 'redux';
import items from './itemsReducer';
import filter from './filterReducer';


export default combineReducers({
    items,
    filter
}); 

