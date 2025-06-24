import { Component } from '@angular/core';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { Store } from '@ngrx/store';
import { Tasks, Users } from '../../model/task';
import { deleteTask, getAllProject, GetAllTask, TaskAction } from '../../store/action/task.action';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { getTaskListData, selectEnrichedTasks } from '../../store/selector/task.selector';
import { GetAllUsers } from '../../store/action/user.action';

@Component({
  selector: 'app-task',
  imports: [AddEditTaskComponent, RouterLink, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  taskList$?: Observable<Tasks[]>;
  taskList: any=[];
  constructor(private store: Store<{ tasks: Tasks[] }>) {
    this.store.dispatch(GetAllTask())
    // this.store.dispatch(getAllProject());   // ✅ must be done
  // this.store.dispatch(GetAllUsers()); 


  }

  ngOnInit()
  {
    //  this.taskList = this.store.select(selectEnrichedTasks);
    // console.log(this.taskList$);
     this.store.select(selectEnrichedTasks).subscribe((res)=>{
      this.taskList=res;
     });
  }

  onEdit(task: Tasks) {
    const payload = {
      id: task.id
    }
    this.store.dispatch(TaskAction.getTask({ payload }));
  }

  delete(id: any) {
    const payload = {
      id: id
    }
    this.store.dispatch(deleteTask({ id:id }))
  }
}
// function GetAllProjects(): any {
//   throw new Error('Function not implemented.');
// }

