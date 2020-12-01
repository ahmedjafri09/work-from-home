import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import playerReducer from "./player/playerReducer";

const store = createStore(playerReducer, applyMiddleware(thunkMiddleware));

export default store;
