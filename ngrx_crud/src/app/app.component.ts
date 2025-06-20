import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Tasks } from '../model/task';
import { TaskAction } from '../store/action/task.action';

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

  }
}
