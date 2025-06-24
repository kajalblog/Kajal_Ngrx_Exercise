import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks, Users } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  fetchAllTasks(): Observable<Tasks[]> {
  return this.http.get<Tasks[]>('http://localhost:3000/tasks');
}

addTaskAPI(task: Tasks): Observable<Tasks> {
  return this.http.post<Tasks>(
    'http://localhost:3000/tasks',
    task,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

fetchTaskBYId(id: number): Observable<Tasks> {
  return this.http.get<Tasks>(`http://localhost:3000/tasks?id=${id}`);
}


editTaskAPI(task: any): Observable<any> {
  console.log("📤 PUT Request Payload:", task);
  return this.http.put<any>(`http://localhost:3000/tasks/${task.id}`, task, {
    headers: { 'Content-Type': 'application/json' }
  });
}


  getAllusers():Observable<any>
  {
    return this.http.get<any>("http://localhost:3000/users");
  }

  deleteTask(id:number):Observable<any>
  {
    return this.http.delete<any>(`http://localhost:3000/tasks/${id}`);
  }

  getUserById(id: number): Observable<Users> {
  return this.http.get<Users>(`http://localhost:3000/users/${id}`);
}

  editUser(user: any): Observable<Users> {
  return this.http.put<Users>(`/api/users/${user.id}`, user);
}
}

