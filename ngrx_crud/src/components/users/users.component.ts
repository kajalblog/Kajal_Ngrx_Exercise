import { Component } from '@angular/core';
import { AddEditUsersComponent } from '../add-edit-users/add-edit-users.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Users } from '../../model/task';
import { CommonModule } from '@angular/common';
import { selectUserList, selectUsers } from '../../store/selector/task.selector';
import { deleteUser, GetAllUsers, getUser } from '../../store/action/user.action';
import { getEmpList } from '../../store/selector/user.selector';

@Component({
  selector: 'app-users',
  imports: [AddEditUsersComponent, RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  Users$?: Observable<Users[]>;

  Users: any = [];

  constructor(private store: Store<{ users: Users[] }>) {

  }
  ngOnInit() {
    this.store.dispatch(GetAllUsers());
    this.Users$ = this.store.select(getEmpList);
  }
  onEditUser(id: any) {
    this.store.dispatch(getUser({ id: id }))
  }

  delete(id: any) {
    const payload = {
      id: id
    }
    this.store.dispatch(deleteUser({ id: id }))
  }
}
