import { createReducer, on } from "@ngrx/store";
import { Users } from "../../model/task";
import { GetAllUsersSuccess } from "../action/user.action";

export const initialState: Users[] = [];

export const UserReducer = createReducer(
  initialState,
  on(GetAllUsersSuccess, (state, action) => {
    return [...action.payload];
  })
);
