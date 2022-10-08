import { Component, OnInit } from '@angular/core';
import { GetTaskListService } from '../services/get-task-list.service';
import { Task } from '../interface';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  task : Task = {
    name:'',
    date:'',
    important : false
  }
  name : string = '';
  date : string = '';
  time : string = '';
  important : boolean = false;
  showForm : boolean = false;
  taskList : Task[] = []

  constructor(private getTasks : GetTaskListService) { }

  ngOnInit(): void {
    this.getTasks.getTaskListService().subscribe(taskList => {
       this.taskList = taskList.sort(
        (objA : Task, objB : Task) =>  new Date(objA.date).getTime() - new Date(objB.date).getTime(),
      );
      this.taskList = this.taskList.filter(task => new Date(task.date).getTime() >= new Date().getTime() )
      console.log(taskList);
  })
  }

  showFormMethod(){
    this.showForm = !this.showForm
  }

  addTask(name : string, date: string, time: string, important: boolean){
    let task : Task = {
      name: name,
      date: date,
      important
    }
    if (task.date !== ''){
    this.task.date = `${date} ${time}`;
    this.taskList.push(task);
    this.taskList = this.taskList.sort(
      (objA : Task, objB : Task) =>  new Date(objA.date).getTime() - new Date(objB.date).getTime(),
    );
    this.showFormMethod();
  } else {
    alert("Debe ingresar una fecha")
  }
  }

  deleteTask(task:Task){
    console.log(task)
    this.taskList = this.taskList.filter(item => item !== task)
  }
}
