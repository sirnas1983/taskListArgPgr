import { Component, OnInit } from '@angular/core';
import { GetTaskListService } from '../services/get-task-list.service';
import { Task } from '../interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PutTaskListServiceService } from '../services/put-task-list-service.service';
import { DeleteTaskService } from '../services/delete-task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  task : Task = {
    id:0,
    name:'',
    date:'',
    important : false
  }
  id : number = 0;
  name : string = '';
  date : string = '';
  time : string = '';
  important : boolean = false;
  showForm : boolean = false;
  taskList : Task[] = []
  daysNextTask : string = '';
  showOverdue : boolean = true;
  originalTaskList : Task[] = [];

  constructor(private getTasks : GetTaskListService, 
    private snackBar: MatSnackBar, 
    private putTasks : PutTaskListServiceService,
    private deleteTaskService : DeleteTaskService) { 

    }

  ngOnInit(): void {
    this.getTasks.getTaskListService().subscribe(taskList => {
    this.taskList = this.sortTaskList(taskList);
    console.log(this.taskList);
    this.notificacion();
  });
  }

  notificacion(){
    if (this.taskList.length>0) {
    let hoy = new Date();
    let dias = Math.floor((new Date(this.filterTaskList()[0].date).getTime() - hoy.getTime()) / 1000 / 60 / 60 / 24);
    if (dias > 0){
      this.openSnackBar(`Faltan ${dias} dias para su siguiente tarea!`);
    } else if (this.taskList.length !== 0) {
      this.openSnackBar('Hoy tiene tareas pendientes!');
    } else {
      this.openSnackBar('No tiene tareas pendientes');
    };
  }
}

  toggle(event: Event) {
      const listOfTasks = document.querySelectorAll("app-item-of-list .overdue");
      listOfTasks.forEach(task => {task.classList.toggle("display")});
  }

  openSnackBar(message : string){
    this.snackBar.open(message,'',
    {duration:3000});
  }

  sortTaskList(taskList : Task[]) {
    return taskList.sort(
      (taskA : Task, taskB : Task) =>  new Date(taskA.date).getTime() - new Date(taskB.date).getTime(),
    );
  }

  filterTaskList(){
    let filteredTaskList = this.taskList.filter(task => new Date(task.date).getTime() > new Date().getTime());
    return filteredTaskList;
  }

  showFormMethod(){
    this.showForm = !this.showForm
  }

  addTask(name : string, date: string, important: boolean){
    let task : Task = {
      id : this.taskList.length + 1,
      name: name,
      date: date,
      important
    };
    console.log(task);
    if (task.date !== ''){
        this.task.date = (new Date(date).toLocaleString('es-AR'));
        this.taskList.push(task);
        this.taskList = this.sortTaskList(this.taskList);
        this.notificacion();
        this.showFormMethod();
        this.putTasks.putTaskListService(JSON.parse(JSON.stringify(task))).subscribe(response => {
          console.log(response)
        })
    } else {
        this.openSnackBar("Debe ingresar una fecha")
    }
  }

  deleteTask(task:Task){
    this.taskList = this.taskList.filter(item => item !== task);
    this.deleteTaskService.deleteTaskListService(task).subscribe(response => {
    if (!response.ok){
      console.log(response);
      this.notificacion()} 
    })
  }



}

  
