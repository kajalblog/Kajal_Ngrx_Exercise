import { Injectable } from "@angular/core";
import { Tasks, Users } from "../model/task";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    getAllUsers(): Observable<Users[]> {
        return this.http.get<Users[]>('http://localhost:3000/users');
    }
    addUserAPI(user: Users) {
        return this.http.post<Users>('http://localhost:3000/users', user, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
    getUserById(Id: number) {
        return this.http.get<Users>("http://localhost:3000/users" + '/' + Id);
    }

    updateUser(user: Users): Observable<Users> {
        return this.http.put<Users>(`http://localhost:3000/users/${user.id}`, user);
    }
    deleteUser(Id:number |string)
    {
        return this.http.delete(`http://localhost:3000/users/${Id}`)
    }



}