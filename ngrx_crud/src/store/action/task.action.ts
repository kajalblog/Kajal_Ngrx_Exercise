import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Tasks } from "../../model/task";

export const GetAllTask = createAction('[Tasks] Get All Task');
export const GetAllTaskSuccess = createAction('[Tasks] Get All Task Success', props<{ payload: Tasks[] }>());
export const GetAllTaskFailure = createAction('[Tasks] Get All Task Failure');

export const getAllProject=createAction(
    '[Project] Get All Project'
)

export const getAllTaskSuccess=createAction(
    '[Project] Get All Task Success',
    props<{payload:Tasks[]}>()
)



export  const addToTask=createAction(
    '[Bucket]Add',
    props<{payload:Tasks}>()
)

// On success
export const addTaskSuccess = createAction(
  '[Bucket] Add Task Success',
  props<{ payload: Tasks }>()
);

export const addTaskFailure = createAction('[Bucket] Add Task Failure');

export const addUser = createAction(
  '[User] Add User',
  props<{ payload: Tasks }>()
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ payload: Tasks }>()
);

export const addUserFailure = createAction('[User] Add User Failure');


// export const loadTasksSuccess = createAction(
//   '[Task API] Load Tasks Success',
//   props<{ payload: Tasks[] }>()
// );
export const getTaskById=createAction(
  '[Bucket] GetById',
  props<{id:number}>()
)

// export const editTask = createAction(
//   '[Task] Edit Task',
//   props<{ payload: Tasks }>()
// );
// export const updateTsk=createAction(
//   '[Bucket] Update Task',
//   props<{id:number}>()
// )

// export const editTaskSuccess = createAction(
//   '[Task API] Edit Task Success',
//   props<{ payload: Tasks }>()
// );
export const editTaskFailure = createAction('[Task API] Edit Task Failure');

export const getTask = createAction(
  '[Task] Get Task',
  props<{ payload: { id: number } }>()
);

export const getTaskSuccess = createAction(
  '[Task API] Get Task Success',
  props<{ payload: Tasks }>()
);

export const getTaskFailure = createAction(
  '[Task API] Get Task Failure'
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ payload: Tasks }>()
);

export const editTaskSuccess = createAction(
  '[Task] Edit Task Success',
  props<{ task: Tasks }>()
);

export const deleteTask = createAction(
  '[Users] Delete Task', props<{ id: number }>()
)

export const deleteTaskSuccess = createAction(
  '[User] Delete Task Success',
  props<{ id: string | number }>()
);

export const TaskAction = createActionGroup({
  source: 'Task API',
  events: {
    'Add Task': props<{ payload: Tasks [] }>(),
    'Load All Task': emptyProps(),
    'getAllTaskSuccess': props<{ payload: Tasks[] }>(), // ✅ fixed
    'Update Task': props<{id:number}>(),
    'Delete Task': props<{ payload: Partial<Tasks> }>(),
    'Get Task': props<{ payload: Partial<Tasks> }>(),
    'Get All Task Failure': emptyProps()
  }
});
