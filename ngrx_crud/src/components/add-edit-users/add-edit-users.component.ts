import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../model/task';
import { Store } from '@ngrx/store';
import { addUser } from '../../store/action/user.action';
// import { AddUsers } from '../../store/action/user.action';

@Component({
  selector: 'app-add-edit-users',
  imports: [FormsModule],
  templateUrl: './add-edit-users.component.html',
  styleUrl: './add-edit-users.component.css'
})
export class AddEditUsersComponent {

  userObj:any={
    name: '',
    email: ''
  };

  constructor(private store:Store<{user:Users}>)
  {


  }

  ngOnInit()
  {
   
  }
  resetUsers()
  {

  }

  onSaveUsers()
  {
    const payload = {
  id: Math.floor(Math.random() * 1000000), // or let backend assign
  name: this.userObj.name,
  email: this.userObj.email
};

this.store.dispatch(addUser({ payload }));

  }

}
