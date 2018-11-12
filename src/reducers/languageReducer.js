import { FETCHING_IP, SUCCES, SET_LANG } from "../constans/ActionTypes";

const initialState = null;

export default function( state = initialState, action ) {
    switch( action.type ) {
        case `${FETCHING_IP}_${SUCCES}` :
            return action.payload
        case SET_LANG :
            return action.payload    
        default :
            return state;
    }
} 