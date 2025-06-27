import { inject, Injectable } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addUser, addUserFailure, addUserSuccess, deleteUser, deleteUserSuccess, editUser, editUserSuccess, GetAllUsers, GetAllUsersFailure, GetAllUsersSuccess, getUserById, getUserByIdFailure, getUserByIdSuccess } from "../../action/user.action";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { UserService } from "../../../services/user.service";
import { Users } from "../../../model/task";

@Injectable({
  providedIn: 'root'
})

export class UserEffect {
  private actions$ = inject(Actions);

  constructor(private cs: TaskService,
    private us: UserService
  ) {

  }

getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllUsers),
      exhaustMap(() =>
        this.us.getAllUsers().pipe(
          map((users: Users[]) => GetAllUsersSuccess({ payload: users })),
          catchError(() => of(GetAllUsersFailure()))
        )
      )
    )
  );

addUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addUser),
    mergeMap((action) =>
      this.us.addUserAPI(action.payload).pipe(
        map((res: Users) =>
           addUserSuccess({ payload: res })),
        catchError((err) => {
          return of(addUserFailure());
        })
      )
    )
  )
);

getUserById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getUserById),
    exhaustMap((action) =>
      this.us.getUserById(action.id).pipe(
        map((user: Users) => getUserByIdSuccess({ payload: user })),
        catchError(() => of(getUserByIdFailure()))
      )
    )
  )
);


editUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(editUser),
    switchMap(({ payload }) =>
      this.us.updateUser(payload).pipe(
        map(updatedUser => 
        editUserSuccess({user:updatedUser})
        )
      )
    )
  )
);

deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteUser),
    mergeMap(({ id }) =>
      this.us.deleteUser(id).pipe(
        map(() => deleteUserSuccess({ id }))
      )
    )
  )
);


}