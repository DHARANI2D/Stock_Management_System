import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userslice";

const initstate = {
  user: ""
};

const myreducer = (state = initstate, action) => {
  if (action.type === "SET_USERNAME") {
    return {
      ...state,
      user: action.user
    };
  }
  return state;
};

const store = configureStore({
  reducer: myreducer
});

export default store;
