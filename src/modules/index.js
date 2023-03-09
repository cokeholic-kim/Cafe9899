import { combineReducers } from "redux";
import orderAdd from "./oreder";
import logincheck from "./logincheck";

const rootReducer = combineReducers({logincheck,orderAdd})

export default rootReducer