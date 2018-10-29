import { ADD_TO_CART, DELETE_FROM_CART } from "../constans/ActionTypes";

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [
                ...state, action.payload
            ]
        case DELETE_FROM_CART:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}