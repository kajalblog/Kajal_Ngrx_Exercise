import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Tasks } from '../../model/task';
import { Store } from '@ngrx/store';
import { addToTask, editTask, getTask, TaskAction } from '../../store/action/task.action';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { selectUserState } from '../../store/selector/user.selector';
import { NgSelectModule } from '@ng-select/ng-select';
import { getProjectList, selectProjectById, selectProjectsWithUsers } from '../../store/selector/project.selector';
import { selectTaskById } from '../../store/selector/task.selector';

@Component({
  selector: 'app-add-edit-task',
  imports: [FormsModule, NgSelectModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css'
})
export class AddEditTaskComponent {
  taskObj: any = {};
  editTask$?: Observable<Tasks | undefined>;
  editMode: boolean = false;
  // id: any;
  ProjectList: any = [];
  userList: any = [];
  priorityList: any = [
    { name: 'High' },
    { name: 'Low' },
    { name: 'Medium' }
  ]
  taskStatus: any = [
    { name: 'To-Do' },
    { name: 'Inprogress' },
    { name: 'Pending' }
  ]
  constructor(private store: Store<{ task: Tasks[] }>,
    public route: ActivatedRoute,
    private router: Router,
    private cs: TaskService
  ) {

    this.store.select(getProjectList).subscribe((data: any) => {
      this.ProjectList = data;
    })
  }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      const taskId = params['id'];
    });
    this.cs.fetchAllTasks().pipe(
      tap(data => console.log('Fetched:', data)), // ✅ add this

    )

    this.route.queryParams.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        let id = +idParam;
        this.editMode = true;
        // this.store.dispatch(getTask({ payload: { id: this.id } }));
        // this.store.select(selectTaskById(id)).subscribe((res)=>{
        //   console.log(res);
        //   if(res)
        //   {
        //     this.taskObj={...res}
        //   }
        // })
        let result = this.store.select(selectTaskById(id)).subscribe((res) => {
          this.taskObj = { ...res };
          this.store.select(selectProjectsWithUsers).subscribe((projects) => {
            const project = projects.find(p => p.id == this.taskObj.project);
            this.userList = project ? project.users : [];
          })
        });
        //  this.store.select(selectTaskById(id)).subscribe(user => {
        //   if (user) {
        //     this.taskObj = { ...user }; // ✅ bind to form
        //   }
        // });
      }
    });
  }

  getUsers(e: any) {
    this.taskObj.users = null;
    this.getProject(e.id);
    // this.store.select(selectProjectsWithUsers).subscribe((projects) => {
    //   const project = projects.find(p => p.id == e.id);
    //   this.userList = project ? project.users : [];
    // })
  }

  getProject(id: any) {
    this.store.select(selectProjectsWithUsers).subscribe((projects) => {
      const project = projects.find(p => p.id == id);
      this.userList = project ? project.users : [];
    })
  }

  // getData() {
  //   this.store.select(selectTaskById(this.id)).subscribe((task: any) => {
  //     if (task) {
  //       this.taskObj = { ...task }; // Set object
  //       this.editMode = true;
  //     }
  //   });
  // }

  onSaveTask() {
    // this.store.select(selectTask).subscribe((tasks) => {
    // });
    if (!!this.editMode) {
      const payload = {
        id: this.taskObj.id.toString(),
        // title: this.taskObj.title,
        // description: this.taskObj.description,
        // tags: this.taskObj.tags,
        // duration: this.taskObj.duration
        ...this.taskObj
      }
      this.store.dispatch(editTask({ payload }))
      // this.cs.editTaskAPI(payload).subscribe({
      //   next: res => console.log('✅ Direct PUT success:', res),
      //   error: err => console.error('❌ Direct PUT failed:', err)
      // });
    }
    else {
      const payload = {
        id: Math.floor(Math.random() * 1000000).toString(),
        // title: this.taskObj.title,
        // description: this.taskObj.description,
        // tags: this.taskObj.tags,
        status: 'To-Do',
        ...this.taskObj
      }
      this.store.dispatch(addToTask({ payload }));
      this.taskObj = {
        id: 0,
        title: '',
        description: '',
        tags: '',
        duration: '',

      };

    }

    this.editMode = false;
    this.router.navigate(['/task']);
  }
}
