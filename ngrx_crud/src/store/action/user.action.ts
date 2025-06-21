import { createAction, emptyProps, props } from "@ngrx/store";
import { Users } from "../../model/task";

export const GetAllUsers = createAction('[User] Get All');
export const GetAllUsersSuccess = createAction('[User] Get All Success', props<{ payload: Users[] }>());
export const GetAllUsersFailure = createAction('[User] Get All Failure');

export const addUser = createAction(
  '[User] Add User',
  props<{ payload: Users }>()
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ payload: Users }>()
);

export const addUserFailure = createAction('[User] Add User Failure');

export const getUserById = createAction(
  '[User] Get User By ID',
  props<{ id: number }>()
);

export const getUserByIdSuccess = createAction(
  '[User] Get User By ID Success',
  props<{ payload: Users }>()
);

export const getUserByIdFailure = createAction('[User] Get User By ID Failure');

export const editUser = createAction(
  '[Task] Edit Task',
  props<{ payload: Users }>()
);

export const editUserSuccess = createAction(
  '[Task] Edit Task Success',
  props<{ user: Users }>()
);

export const UpdateUsers = createAction(
  '[Users] Update Users', props<{ payload: Users }>()
)

export const deleteUser = createAction(
  '[Users] Delete User', props<{ id: number }>()
)

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string | number }>()
);
export const falilUsers = createAction(
  '[Users] Fail', emptyProps
)

export const failDelete = createAction(
  '[User] Delete User Failure', emptyProps
)

