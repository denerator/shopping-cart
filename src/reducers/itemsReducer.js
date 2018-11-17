import { SUCCES, LOADING_ITEMS, ADD_ITEM, DELETE_ITEM } from "../constans/ActionTypes";
let initialState;
if (localStorage.getItem('localItems') !== null) {
    initialState = JSON.parse(localStorage.getItem('localItems'))
} else {
    const initialState = null;
}
export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_ITEM:
            return state.filter(item => item.id !== action.payload);
        case ADD_ITEM:
            return [
                ...state, action.payload
            ]
        case `${LOADING_ITEMS}_${SUCCES}`:
            return action.payload
        default:
            return state;
    }
}
