import { createAction, props } from "@ngrx/store";
import { Project } from "../../model/task";


export const getAllProject=createAction(
    '[Project] Get All Project'
)

export const getAllProjectSuccess=createAction(
    '[Project] Get All Project Success',
    props<{payload:Project[]}>()
)

export const addProject=createAction(
    '[Project] Add Project',
    props<{payload:Project}>()
)

export const addProjectSuccess = createAction(
  '[User] Add Project Success',
  props<{ payload: Project }>()
);

export const editProject = createAction(
  '[Task] Edit Project',
  props<{ payload: Project }>()
);

export const editProjectSuccess = createAction(
  '[Task] Edit Project Success',
  props<{ project: Project }>()
);

export const deletePRoject = createAction(
  '[Users] Delete Project', props<{ id: number }>()
)

export const deleteProjectSuccess = createAction(
  '[User] Delete Project Success',
  props<{ id: string | number }>()
);
