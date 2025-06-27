import { createReducer, on } from "@ngrx/store";
import { Users } from "../../model/task";
import { addUserSuccess, deleteUserSuccess, editUserSuccess, GetAllUsersSuccess, getUserByIdSuccess } from "../action/user.action";

export const initialState: Users[] = [];

export const UserReducer = createReducer(
  initialState,
  on(GetAllUsersSuccess, (state, action) => {
    return [...action.payload];
  }),
  on(addUserSuccess, (state, action) => {
    return [ action.payload]; // Add new user to existing state
  }),
  on(getUserByIdSuccess, (state, action) => {
    return [action.payload];
  }),
  on(editUserSuccess, (state, { user }) =>
    state.map(t => t.id == user.id ? { ...t, ...user } : t)
  ),
  // on(editUserSuccess, (state, { user }) => {
  // return state.map(user =>
  //   user.id === user.id ? user : user
  // );
// }),

on(deleteUserSuccess, (state, { id }) => {
  return state.filter(user => user.id != id); // != handles string/number
})

);
