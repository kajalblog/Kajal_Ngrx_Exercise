import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Tasks } from '../model/task';
import { getAllProject, TaskAction } from '../store/action/task.action';
import { GetAllUsers } from '../store/action/user.action';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx_crud';

  constructor(private store:Store<{task:Tasks[]}>)
  {

  }

  ngOnInit()
  {
    // this.store.dispatch(TaskAction.loadAllTask())
    // this.store.dispatch(getAllProject());   // ✅ must be done
  // this.store.dispatch(GetAllUsers()); 


  }
}
