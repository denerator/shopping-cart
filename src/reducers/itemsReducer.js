import { SUCCES } from "../constans/ActionTypes";

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case SUCCES :
            return action.payload
        default:
            return state;
    }
}