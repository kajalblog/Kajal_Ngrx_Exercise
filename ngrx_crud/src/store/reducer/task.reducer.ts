import { createReducer, on } from "@ngrx/store";
import { addTaskSuccess, addToTask, deleteTaskSuccess, editTask, editTaskSuccess, getAllTaskSuccess, getTaskById, TaskAction } from "../action/task.action";
import { Tasks, Users } from "../../model/task";
import { addUserSuccess, GetAllUsers } from "../action/user.action";

export const initialState: Tasks[] = [];

export const TaskReducer = createReducer(initialState,

    // on(addToTask, (state, action) => {
    //     console.log(state, action)
    //     return [
    //         ...state,
    //         action.payload
    //     ]
    // }),

  on(getAllTaskSuccess, (state, action) => {
    return [ ...action.payload]; // Add new user to existing state
  }),
//     on(GetAllUsers, (state) => {
//   return [...state];
// }),
//   on(editTask, (state, action) => {
//   return state.map((t: Tasks) =>
//     t.id === action.payload.id ? { ...t, ...action.payload } : t
//   );
// }),
//   on(editTaskSuccess, (state, action) => {
//   console.log("🛠 Updating state for:", action.payload.id);
//   return state.map(t =>
//     t.id === action.payload.id ? { ...t, ...action.payload } : t
//   );
// }),

 on(deleteTaskSuccess, (state, { id }) => {
    return state.filter(task => task.id != id); // != handles string/number
  }),

    on(TaskAction.deleteTask, (state, action) => {
        const existingItem = state.find((item: Tasks) => {
            return item.id === action.payload.id
        });
        if (existingItem) {
            return state.filter((item: Tasks) => item.id !== action.payload.id)
        }
        return state;
    }),

)
