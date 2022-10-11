import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostTaskListService {

  constructor(private http : HttpClient) { }

  postTaskListService(task: Task, url : string) : Observable<any> {
    return this.http.post('http://localhost:3000/tasks/' + url, task )
  }
  
}
