import { combineReducers } from "redux";
import userSlice from "./userSlice";

export const userReducer = combineReducers({
    userReducer: userSlice
})