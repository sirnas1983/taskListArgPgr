import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../interface';

@Component({
  selector: 'app-item-of-list',
  templateUrl: './item-of-list.component.html',
  styleUrls: ['./item-of-list.component.css']
})
export class ItemOfListComponent implements OnInit {
@Input() task : Task = {name:'',date:'',important:false};
@Input() taskList:Task[] = [];
@Output() newChildEventEmitter = new EventEmitter<Task>()
overdue :boolean=false;
  
constructor() { }
deleteTask(event:Event, task:Task){
  event.stopPropagation();
  this.newChildEventEmitter.emit(task);
}

toggleImportant(){
  console.log("prueba")
  this.task.important=!this.task.important;
}
  ngOnInit(): void {
    if (new Date(this.task.date) < new Date()) {
      this.overdue = true;
    }
  }



}
