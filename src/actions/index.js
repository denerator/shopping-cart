import { ADD_TO_CART } from "../constans/ActionTypes";

export const addToCart = item => ({
	type: ADD_TO_CART,
	payload: item
});


