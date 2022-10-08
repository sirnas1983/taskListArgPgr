import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetTaskListService {

  constructor(private http:HttpClient) { }

  getTaskListService():Observable<any>{
    return this.http.get('../../assets/mock-taskList.json')
    }

}


