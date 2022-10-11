import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../interface';

@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.component.html',
  styleUrls: ['./list-of-tasks.component.css']
})
export class ListOfTasksComponent implements OnInit {
  @Input() taskList:Task[]= [];
  @Output() deleteTaskEmitter = new EventEmitter<Task>()

  task : Task = {
    id : 0,
    name :"",
    date:'',
    important : false
  }

  constructor() { 

  }


  ngOnInit(): void {
  }

  notifyAPP(task : Task) {
    this.deleteTaskEmitter.emit(task);
  }

}
