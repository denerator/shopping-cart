import { SUCCES, LOADING_ITEMS, ADD_ITEM } from "../constans/ActionTypes";

const initialState = null;


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM : 
            return [
                ...state, action.payload
            ]
        case `${LOADING_ITEMS}_${SUCCES}`:
            return action.payload
        default:
            return state;
    }
}