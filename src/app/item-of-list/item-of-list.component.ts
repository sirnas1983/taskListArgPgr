import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../interface';
import { PutTaskListServiceService } from '../services/put-task-list-service.service';

@Component({
  selector: 'app-item-of-list',
  templateUrl: './item-of-list.component.html',
  styleUrls: ['./item-of-list.component.css']
})
export class ItemOfListComponent implements OnInit {
@Input() task : Task = {id:0, name:'',date:'',important:false};
@Input() taskList:Task[] = [];
@Output() deleteTaskEmitter = new EventEmitter<Task>()

overdue :boolean=false;
  
constructor(private putTasks : PutTaskListServiceService) { }

deleteTask(event:Event, task:Task){
  event.stopPropagation();
  this.deleteTaskEmitter.emit(task);
}

  toggleImportant(){
    this.task.important=!this.task.important;
    this.putTasks.putTaskListService(JSON.parse(JSON.stringify(this.task)),  this.task.id + '/').subscribe(response => {
      console.log(response)
    },
    error => {alert(`${error.status} - Ha ocurrido un error en el servidor, ¡Porfavor intente mas tarde!`)}
    )


  }

  ngOnInit(): void {
    if (new Date(this.task.date) < new Date()) {
      this.overdue = true;
    }
  }



}
