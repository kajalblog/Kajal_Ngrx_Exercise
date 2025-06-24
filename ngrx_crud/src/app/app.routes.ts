import { Routes } from '@angular/router';
import { TaskComponent } from '../components/task/task.component';
import { AddEditTaskComponent } from '../components/add-edit-task/add-edit-task.component';
import { UsersComponent } from '../components/users/users.component';
import { ProjectComponent } from '../components/project/project.component';
import { AddEditProjectComponent } from '../components/add-edit-project/add-edit-project.component';
import { AddEditUsersComponent } from '../components/add-edit-users/add-edit-users.component';

export const routes: Routes = [
    {path:'',redirectTo:'users',pathMatch:'full'},
    {path:'task',component:TaskComponent},
    {path:'add-edit-task',component:AddEditTaskComponent},
    // {path:':edit/:id',component:AddEditTaskComponent},
    {path:'project',component:ProjectComponent},
    {path:'project',component:ProjectComponent},
    {path:'add-edit-project',component:AddEditProjectComponent},
{ path: 'add-edit-user', component: AddEditUsersComponent } ,
{path:'users',component:UsersComponent}


    
];
