import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../services/task.service';
import { addTaskFailure, addTaskSuccess, addToTask, deleteTask, deleteTaskSuccess, editTask, editTaskFailure, editTaskSuccess, GetAllTask, GetAllTaskFailure, getAllTaskSuccess, GetAllTaskSuccess, getTask, getTaskFailure, getTaskSuccess, TaskAction } from '../action/task.action';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Tasks } from '../../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskEffect {
  private actions$ = inject(Actions);

  constructor(
    private cs:TaskService
  ) { }
//  loadTasks$ = createEffect(() => {
//     return this.actions$.pipe(
//         ofType(TaskAction.loadAllTask),
//         exhaustMap(() => this.cs.fetchAllTasks()
//           .pipe(
//             map((tasks: Tasks[]) => loadTasksSuccess({ payload: tasks })),
//             catchError(() => of(TaskAction.getAllTaskFailure()))
//           ))
//     );
//   });
//   addTask$ = createEffect(() =>
//    this.actions$.pipe(
//     ofType(addToTask),
//     switchMap((action) =>
//       this.cs.addTaskAPI(action.payload).pipe(
//         map((task) => addTaskSuccess({ payload: task })),
//         catchError((error) => {
//           console.error('❌ POST error:', error);
//           return of(addTaskFailure());
//         })
//       )
//     )
//   )
// );

getAllTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllTask),
      mergeMap(() =>
        this.cs.fetchAllTasks().pipe(
          map((tasks: Tasks[]) => getAllTaskSuccess({ payload: tasks })),
          catchError(() => of(GetAllTaskFailure()))
        )
      )
    )
  );
  
addTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addToTask),
    switchMap((action) =>
      this.cs.addTaskAPI(action.payload).pipe(
        map((res: Tasks) =>
           addTaskSuccess({ payload: res })),
        catchError((err) => {
          return of(addTaskFailure());
        })
      )
    )
  )
);

//  editTask$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(editTask),
//     switchMap((action: ReturnType<typeof editTask>) => {
//       console.log('🟡 Updating task with ID:', action.payload.id);
//       return this.cs.editTaskAPI(action.payload).pipe(
//         map(() => {
//           console.log('✅ API Success for ID:', action.payload.id);
//           return editTaskSuccess({ payload: action.payload });
//         }),
//         catchError((error) => {
//           console.error('❌ API PUT error:', error); // Important log
//           return of(editTaskFailure());
//         })
//       );
//     })
//   )
// );



editTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(editTask),
    exhaustMap(({ payload }) =>
      this.cs.editTaskAPI(payload).pipe(
        map(updatedUser => 
        editTaskSuccess({task:updatedUser})
        )
      )
    )
  )
);
// editTask$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(editTask),
//     tap(action => console.log('🔥 Effect triggered for editTask', action)), // ✅
//     switchMap(action =>
//       this.cs.editTaskAPI(action.payload).pipe(
//         tap(() => console.log("✅ editTaskAPI called")),
//         map(() => editTaskSuccess({ task: action.payload })),
//         catchError(error => {
//           console.error('❌ editTask API error:', error);
//           return of(editTaskFailure());
//         })
//       )
//     )
//   )
// );


getTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getTask),
    switchMap((action) =>
      this.cs.fetchTaskBYId(action.payload.id).pipe(
        map((task:any) => getTaskSuccess({ payload: task })),
        catchError(() => of(getTaskFailure()))
      )
    )
  )
);

deleteTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteTask),
    switchMap(({ id }) =>
      this.cs.deleteTask(id).pipe(
        map(() => deleteTaskSuccess({ id }))
      )
    )
  )
);





  //  getTask$ = createEffect(() => {
  //   return this.actions$.pipe(
  //       ofType(getTaskById),
  //       exhaustMap((item) => this.cs.fetchTaskBYId(item.id)
  //         .pipe(
  //           map((data:any) => TaskAction.getTask({payload:data})),
  //           catchError(() => of(TaskAction.getAllTaskFailure()))
  //         ))
  //   );
  // });

}




