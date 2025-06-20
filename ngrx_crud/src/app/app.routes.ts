import { Routes } from '@angular/router';
import { TaskComponent } from '../components/task/task.component';
import { AddEditTaskComponent } from '../components/add-edit-task/add-edit-task.component';
import { UsersComponent } from '../components/users/users.component';
import { ProjectComponent } from '../components/project/project.component';
import { AddEditProjectComponent } from '../components/add-edit-project/add-edit-project.component';

export const routes: Routes = [
    {path:'',redirectTo:'users',pathMatch:'full'},
    {path:'task',component:TaskComponent},
    {path:'edit-task',component:AddEditTaskComponent},
    {path:':edit/:id',component:AddEditTaskComponent},
    {path:'users',component:UsersComponent},
    {path:'project',component:ProjectComponent},
    
];
