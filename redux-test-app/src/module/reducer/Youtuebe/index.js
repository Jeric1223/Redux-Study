import { YOUTUBE_ACTIONS } from "../../action/Youtube/index";

const initialState = {
  subscribe: false,
};

export default function reducerYoutube(state = initialState, action) {
  const { SET_SUBSCRIBE, CANSLE_SUBSCRIBE } = YOUTUBE_ACTIONS;
  switch (action.type) {
    case SET_SUBSCRIBE:
      return {
        ...state,
        subscribe: true,
      };
    case CANSLE_SUBSCRIBE:
      return {
        ...state,
        subscribe: false,
      };
    default:
      return state;
  }
}
