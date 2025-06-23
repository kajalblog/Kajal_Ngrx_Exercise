import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../model/task';
import { Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select'
import {  getUserList } from '../../store/selector/user.selector';
import { addProject, editProject } from '../../store/action/project.action';
import { ActivatedRoute, Router } from '@angular/router';
import { selectProjectById, selectProjectsWithUsers } from '../../store/selector/project.selector';
@Component({
  selector: 'app-add-edit-project',
  imports: [FormsModule, NgSelectModule],
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.css'
})
export class AddEditProjectComponent {
  projectObj: any = {

  }
  UsersList: any = [];
  editMode: boolean = false;

  constructor(private store: Store<{ users: Users[] }>,
    private router: Router,
    public route: ActivatedRoute

  ) {
    this.store.select(getUserList).subscribe((data: any) => {
      this.UsersList = data;
    })
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.editMode = true;
        this.store.select(selectProjectById(id)).subscribe(user => {
          if (user) {
            this.projectObj = { ...user }; // ✅ bind to form
          }
        });
      }

    })
  }

  onSaveProject() {
    if (!!this.editMode) {
      let payload = {
        id: this.projectObj.id.toString(),
        ...this.projectObj
      }
      this.store.dispatch(editProject({ payload }))
      this.router.navigate(['/project'])
    }
    else {
      let payload = {
        id: Math.floor(Math.random() * 1000000).toString(),
        ...this.projectObj
      }
      this.store.dispatch(addProject({ payload }))
      this.router.navigate(['/project'])
    }
  }
}
