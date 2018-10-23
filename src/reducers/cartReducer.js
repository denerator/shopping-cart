import { ADD_TO_CART, DELETE_FROM_CART } from "../constans/ActionTypes";

const initialState = {
    total: 0,
    cart: []
};

export default function ( state = initialState, action ) {
    switch (action.type) {
        case ADD_TO_CART :
            return {
                total: state.total + action.payload.price ,
                cart : [ ...state.cart, action.payload ]
            }
            case DELETE_FROM_CART:
                return {
                    total: state.total - action.payload.price ,
                    cart: state.cart.filter( item => item.id !== action.payload.id)
                }    
        default:
            return state;
    }
}