import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../model/task';
import { Store } from '@ngrx/store';
import { addUser, editUser, getUserById } from '../../store/action/user.action';
import { ActivatedRoute, Router } from '@angular/router';
import { selectUserById } from '../../store/selector/user.selector';

@Component({
  selector: 'app-add-edit-users',
  imports: [FormsModule],
  templateUrl: './add-edit-users.component.html',
  styleUrl: './add-edit-users.component.css'
})
export class AddEditUsersComponent {

  userObj: any = {
    name: '',
    email: ''
  };
  editMode: boolean = false;

  constructor(private store: Store<{ user: Users }>,
    private router: Router,
    public route: ActivatedRoute
  ) {

  }

  // ngOnInit() {
  //   this.route.queryParamMap.subscribe(params => {
  //     const id = Number(params.get('id'));
  //     if (id) {
  //       this.editMode = true;
  //       this.store.dispatch(getUserById({ id }));
  //       this.store.select(selectUserById()).subscribe(user => {
  //         if (user) {
  //           // this.userObj = user;
  //           user.map((item) => {
  //             this.userObj = item;
  //             console.log(this.userObj)
  //           })
  //         }
  //       });
  //     }
  //   });
  // }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.editMode = true;
        console.log(id, typeof (id));
        this.store.dispatch(getUserById({ id })); // if needed

        this.store.select(selectUserById(id)).subscribe(user => {
          if (user) {
            this.userObj = { ...user }; // ✅ bind to form
            console.log('User loaded:', this.userObj);
          }
        });
      }
    });
  }


  resetUsers() {

  }

  onSaveUsers() {
    if (!!this.editMode) {
      const payload = {
        id: this.userObj.id.toString(), // 
        name: this.userObj.name,
        email: this.userObj.email
      };
      this.store.dispatch(editUser({ payload }));
    }
    else {

      const payload = {
        id: Math.floor(Math.random() * 1000000).toString(), // 
        name: this.userObj.name,
        email: this.userObj.email
      };

      this.store.dispatch(addUser({ payload }));

      this.userObj = {
        name: '',
        email: ''
      };
    }
    this.router.navigate(['/users'])

  }

}
