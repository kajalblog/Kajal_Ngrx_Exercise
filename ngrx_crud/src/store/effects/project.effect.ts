import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "../../services/project.service";
import { addProject, addProjectSuccess, deletePRoject, deleteProjectSuccess, editProject, editProjectSuccess, getAllProject, getAllProjectSuccess } from "../action/project.action";
import { exhaustMap, map, mergeMap, switchMap } from "rxjs";
import { Project } from "../../model/task";


@Injectable({
    providedIn:"root"
})

export class ProjectEffect{

  private actions$ = inject(Actions);

    constructor(private ps:ProjectService)
    {

    }

   getProject$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getAllProject),
    exhaustMap(() =>
      this.ps.getAllProject().pipe(
        map((data: Project[]) => getAllProjectSuccess({ payload: data }))
      )
    )
  )
);


addProject$=createEffect(()=>{
   return this.actions$.pipe(
        ofType(addProject),
        mergeMap((action)=>this.ps.addProjectAPI(action.payload).pipe(
            map((res:Project)=>addProjectSuccess({payload:res}))
        ))
    )
})

editProject$ = createEffect(() =>
   this.actions$.pipe(
    ofType(editProject),
    switchMap(({ payload }) =>
      this.ps.updateProject(payload).pipe(
        map(updatedProject => 
        editProjectSuccess({project:updatedProject})
        )
      )
    )
  )
);

deleteProject$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deletePRoject),
    mergeMap(({ id }) =>
      this.ps.deleteProject(id).pipe(
        map(() => deleteProjectSuccess({ id }))
      )
    )
  )
);
//   addProject$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(addProject),
//       switchMap((action) =>
//         this.ps.addProjectAPI(action.payload).pipe(
//           map((res: Users) =>
//              addProjectSuccess({ payload: res })),
//           catchError((err) => {
//             return of(addUserFailure());
//           })
//         )
//       )
//     )
//   );
     
}