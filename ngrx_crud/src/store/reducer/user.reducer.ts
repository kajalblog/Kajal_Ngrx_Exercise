import { createReducer, on } from "@ngrx/store";
import { Users } from "../../model/task";
import { addUserSuccess, GetAllUsersSuccess } from "../action/user.action";

export const initialState: Users[] = [];

export const UserReducer = createReducer(
  initialState,
  on(GetAllUsersSuccess, (state, action) => {
    return [...action.payload];
  }),
  on(addUserSuccess, (state, action) => {
  return [...state, action.payload]; // Add new user to existing state
}),
);
