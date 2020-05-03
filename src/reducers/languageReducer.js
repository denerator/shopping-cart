import { FETCHING_IP, SUCCESS, SET_LANG } from '../constants/ActionTypes';

const initialState = {
  lang: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case `${FETCHING_IP}_${SUCCESS}`:
      return {
        ...state,
        lang: action.payload,
      };
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
}
