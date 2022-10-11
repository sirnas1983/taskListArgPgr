import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskService {

  constructor(private http:HttpClient) { }

  deleteTaskListService(task : any):Observable<any>{
    console.log(task.id);
    return this.http.delete(`http://localhost:3000/tasks/${task.id}`)
    }

}

