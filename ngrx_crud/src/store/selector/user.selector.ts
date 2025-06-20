import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Users } from "../../model/task";


const getEmployeeState=createFeatureSelector<Users[]>('users')

export const getEmpList=createSelector(getEmployeeState,(state)=>{
    return state;
})