import customers from "./customers";
import banks from "./banks";
import cities from "./cities";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  customers,
  banks,
  cities
});

export default rootReducer;
