import { combineReducers } from 'redux';
import items from './itemsReducer';
import cart from './cartReducer';

export default combineReducers({
	items,
	cart
}); 

