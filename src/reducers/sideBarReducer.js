import { SET_SIDEBAR_STATE } from '../constants/ActionTypes';

const initialState = {
  sideBarState: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_STATE:
      return {
        ...state,
        sideBarState: !state.sideBarState,
      };
    default:
      return state;
  }
}
