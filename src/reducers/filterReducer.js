import { SET_FILTER, SET_SEARCH } from '../constants/ActionTypes';

const initialState = {
  category: 'All',
  search: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        category: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}
