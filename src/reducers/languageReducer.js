import { FETCHING_IP, SUCCES, SET_LANG } from "../constans/ActionTypes";

const initialState = {
    lang: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case `${FETCHING_IP}_${SUCCES}`:
            return {
                ...state,
                lang: action.payload
            }
        case SET_LANG:
            return {
                ...state,
                lang: action.payload
            }
        default:
            return state;
    }
} 