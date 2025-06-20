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


export const getUser=createAction('[User] Get User',props<{id:number}>());
// export const getUserSuccess=createAction('[User] Get User Success',props<{user:Users}>());

export const getUserSuccess = createAction(
  '[Task API] Get Task Success',
  props<{ payload: Users }>()
);
export const getUserFailure=createAction('[User] Get User Failure')


export const UpdateUsers=createAction(
    '[Users] Update Users',props<{payload:Users}>()
)

export const deleteUser=createAction(
    '[Users] Delete User',props<{id:number}>()
)

export const falilUsers=createAction(
    '[Users] Fail',emptyProps
)

export const failDelete=createAction(
    '[User] Delete User Failure',emptyProps
)

