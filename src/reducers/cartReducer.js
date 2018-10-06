import { ADD_TO_CART } from "../constans/ActionTypes";

const initialState = {
    items: [],
    summ: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART :
            return {
                items: [...state.items, action.payload],
                summ: state.summ + action.payload.price
            };
        default:
            return state;
    }
}