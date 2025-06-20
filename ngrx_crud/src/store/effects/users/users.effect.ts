import { inject, Injectable } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addUser, addUserFailure, addUserSuccess, GetAllUsers, GetAllUsersFailure, GetAllUsersSuccess, getUser, getUserFailure, getUserSuccess } from "../../action/user.action";
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
      mergeMap(() =>
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
    switchMap((action) =>
      this.us.addUserAPI(action.payload).pipe(
        map((res: Users) => addUserSuccess({ payload: res })),
        catchError((err) => {
          console.error('❌ Add API error:', err);
          return of(addUserFailure());
        })
      )
    )
  )
);

// getUser$ = createEffect(() =>
//    return this.actions$.pipe(
//       ofType(getUser),
//       exhaustMap((action) =>{return this.us.getUserById(action.id).pipe(
//           map((data:any) =>{ return getUserSuccess({payload:data}) })),
//           catchError(() => of(GetAllUsersFailure()))
//         })
//       )
    
// );


// getTask$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(getUser),
//     exhaustMap((action:any) =>
//       this.us.getUserById(action.payload.id).pipe(
//         map((task:any) => getUserSuccess({ payload: task })),
//         catchError(() => of(getUserFailure()))
//       )
//     )
//   )
// );





















  // getLoadUsers$=createEffect(()=>{
  //     return this.actions$.pipe(
  //         ofType(loadUsers),
  //         exhaustMap(()=>{
  //             this.cs.getAllusers().pipe(
  //                map((item)=>AddUsers({payload:item})) 
  //             ),
  //             catchError(()=> of(falilUsers()))
  //         })
  //     )
  // })

  // user.effect.ts
  

  // loadUsers$ = createEffect(() => {
  //     return this.actions$.pipe(
  //         ofType(GetAllUsers),
  //         exhaustMap(() => this.cs.getAllusers()
  //           .pipe(
  //             map((user:any) => getUserSuccess({payload:user})),
  //             catchError(() => of(falilUsers()))
  //           ))
  //     );
  //   });
  // addUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AddUsers),
  //     exhaustMap((action: any) => this.us.addUserAPI(action.payload)
  //       .pipe(
  //         map((user: any) => addUserSuccess({ payload: user })),
  //         catchError(() => of(falilUsers()))
  //       ))
  //   );
  // });

  // user.effect.ts



  // deleteUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteUser),
  //     exhaustMap((id: any) => this.cs.deleteUser(id)
  //       .pipe(
  //         map((user: any) => AddUsers({ payload: user })),
  //         catchError(() => of(falilUsers()))
  //       ))
  //   );
  // });

  // UpdateUsers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UpadateUsers),
  //     exhaustMap((item: any) => this.cs.editUser({ item })
  //       .pipe(
  //         map((user: any) => GetAllUsers()),
  //         catchError(() => of(falilUsers()))
  //       ))
  //   );
  // });
}