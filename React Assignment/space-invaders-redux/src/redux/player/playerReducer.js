import React from "react";
import { useSelector } from "react-redux";
import "../../styling/styles.css";

const initialState = {
  horizontalPos: 365,
  verticalPos: 10,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case keyPressed.key === "ArrowLeft" && state.horizontalPos > 10:
      return {
        ...state,
        horizontalPos: state.horizontalPos - 7,
      };
    case keyPressed.key === "ArrowRight" && state.horizontalPos < 720:
      return {
        ...state,
        horizontalPos: state.horizontalPos - 7,
      };
    case keyPressed.key === "ArrowUp" && state.verticalPos < 300:
      return {
        ...state,
        verticalPos: state.verticalPos + 7,
      };
    case keyPressed.key === "ArrowDown" && state.verticalPos > 10:
      return {
        ...state,
        verticalPos: state.verticalPos + 7,
      };
    default:
      break;
  }
};

export default playerReducer;
