import { ADD_TO_CART } from "../constans/ActionTypes";

const initialState = {
    items: [],
    summ: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART :
            return {
                items: (state.items.find( item => item.id == action.payload.id)) 
                    ? state.items.map( item => item.id == action.payload.id ? {...item, amount: item.amount +1} : item) 
                    : [...state.items, {...action.payload, amount:1}] ,
                summ: state.summ + action.payload.price
            };
        default:
            return state;
    }
}