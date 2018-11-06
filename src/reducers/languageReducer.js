import { SET_LANG } from "../constans/ActionTypes";

const initialState = 'EN';

export default function( state = initialState, action ) {
    switch( action.type ) {
        case SET_LANG :
            return action.payload
        default :
            return state;
    }
} 