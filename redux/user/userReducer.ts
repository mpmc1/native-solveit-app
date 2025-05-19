import { combineReducers } from "redux";
import UserData from "./userSlice";

export const userReducer = combineReducers({
    UserData: UserData
})