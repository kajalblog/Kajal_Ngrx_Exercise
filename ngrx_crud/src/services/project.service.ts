import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../model/task";

@Injectable({
    providedIn: 'root'
})

export class ProjectService {
    constructor(private http: HttpClient) {

    }

   getAllProject(): Observable<Project[]> {
  return this.http.get<Project[]>('http://localhost:3000/projects');
}
addProjectAPI(data: Project) {
        return this.http.post<Project>('http://localhost:3000/projects', data, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

     updateProject(data: Project): Observable<Project> {
            return this.http.put<Project>(`http://localhost:3000/projects/${data.id}`, data);
        }
        deleteProject(Id:number |string)
        {
            return this.http.delete(`http://localhost:3000/projects/${Id}`)
        }
}
