import { createReducer, on } from "@ngrx/store";
import { addProjectSuccess, deleteProjectSuccess, editProjectSuccess, getAllProjectSuccess } from "../action/project.action";
import { Project } from "../../model/task";

export const initialState:Project[]=[]

export const ProjectReducer=createReducer(
initialState,
on(getAllProjectSuccess,(state,action)=>{
    return [...action.payload]
}),
on(addProjectSuccess, (state, action) => {
    return [...state, action.payload]; // Add new user to existing state
  }),

  on(deleteProjectSuccess, (state, { id }) => {
    return state.filter(project => project.id != id); // != handles string/number
  })
//   on(editProjectSuccess, (state, { project }) =>{
//      return state.map(t => t.id == project.id ? { ...t, ...project } : t)
//     }),
)