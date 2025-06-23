import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddEditProjectComponent } from '../add-edit-project/add-edit-project.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Project, Users } from '../../model/task';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { deletePRoject, getAllProject } from '../../store/action/project.action';
import { getProjectList, selectProjectsWithUsers } from '../../store/selector/project.selector';

@Component({
  selector: 'app-project',
  imports: [AddEditProjectComponent, CommonModule, RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  projects$?: Observable<Project[]>;
  userData: any = [];
  constructor(private store: Store<{ project: Project[] }>, private router: Router) {

  }
  ngOnInit() {
    this.store.dispatch((getAllProject()));
    this.projects$ = this.store.select(getProjectList);
    this.store.select(selectProjectsWithUsers).subscribe((res) => {
      this.userData = res;
    })
  }

  getUserNames(users: any[]): string {
    return users?.map(u => u.name).join(', ') || '-';
  }

  onAddProject() {
    this.router.navigate(['/add-edit-project'])
  }
  delete(id: any) {
    this.store.dispatch(deletePRoject({ id: id }))
  }
}
