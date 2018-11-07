import { SUCCES, LOADING_ITEMS } from "../constans/ActionTypes";

const initialState = null;


export default function (state = initialState, action) {
    switch (action.type) {
        case `${LOADING_ITEMS}_${SUCCES}`:
            return action.payload
        default:
            return state;
    }
}