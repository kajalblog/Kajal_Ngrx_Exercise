import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Users } from "../../model/task";


const getUserState = createFeatureSelector<Users[]>('users')

export const getEmpList = createSelector(getUserState, (state) => {
  return state;
});
export const selectUserState = (state: any): Users[] => state.user;
export const selectUserById = (id: number) =>
  createSelector(getUserState, (users: Users[]) =>
    users.find(user => +user.id == id) // + handles string/number mismatch
  );


