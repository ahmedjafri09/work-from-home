import { HANDLE_MOVEMENT } from "./playerTypes";

const initialState = {
  horizontalPos: 365,
  verticalPos: 10,
};

const playerReducer = (state = initialState, action) => {
  if (action.type === HANDLE_MOVEMENT) {
    return {
      ...state,
      horizontalPos: state.horizontalPos + 7,
    };
  } else {
    return initialState;
  }
};

export default playerReducer;
