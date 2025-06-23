import { Component } from '@angular/core';
import { AddEditUsersComponent } from '../add-edit-users/add-edit-users.component';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Users } from '../../model/task';
import { CommonModule } from '@angular/common';
import { selectUserList, selectUsers } from '../../store/selector/task.selector';
import { deleteUser, GetAllUsers, getUserById } from '../../store/action/user.action';
import { getUserList } from '../../store/selector/user.selector';

@Component({
  selector: 'app-users',
  imports: [AddEditUsersComponent, RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  Users$?: Observable<Users[]>;

  // Users: any = [];

  constructor(private store: Store<{ users: Users[] }>,
    private router:Router
  ) {
        // this.store.dispatch(GetAllUsers());

  }
  ngOnInit() {
    this.store.dispatch(GetAllUsers());
    this.Users$ = this.store.select(getUserList);
    console.log(this.Users$)
  }
  onAddUser()
  {
    this.router.navigate(['/add-edit-user'])
  }
  onEditUser(id: any) {
    // this.router.navigate(['/add-edit-user', id]);
    this.store.dispatch(getUserById({ id: id }))
  }

  delete(id: any) {
    const payload = {
      id: id
    }
    this.store.dispatch(deleteUser({ id: id }))
  }
  
}
