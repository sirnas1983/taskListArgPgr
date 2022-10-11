import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PutTaskListServiceService {

  constructor(private http : HttpClient) { }

  putTaskListService(task: Task) : Observable<any> {
    return this.http.post('http://localhost:3000/tasks/', task )
  }
  
}
