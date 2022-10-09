import { Component, OnInit } from '@angular/core';
import { GetTaskListService } from '../services/get-task-list.service';
import { Task } from '../interface';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  daysNextTask : string = '';

  constructor(private getTasks : GetTaskListService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTasks.getTaskListService().subscribe(taskList => {
    this.taskList = this.filterAndSortTaskList(taskList)
    this.notificacion();
  });
  }

  notificacion(){
    if (this.taskList.length>0) {
    let hoy = new Date();
    let dias = Math.floor((new Date(this.taskList[0].date).getTime() - hoy.getTime()) / 1000 / 60 / 60 / 24);
    if (dias > 0){
      this.openSnackBar(`Faltan ${dias} dias para su siguiente tarea!`);
    } else if (this.taskList.length !== 0) {
      this.openSnackBar('Hoy tiene tareas pendientes!');
    } else {
      this.openSnackBar('No tiene tareas pendientes');
    };
  }
}

  openSnackBar(message : string){
    this.snackBar.open(message,'',
    {duration:3000});
  }

  filterAndSortTaskList(taskList : Task[]) {
    return taskList.sort(
      (taskA : Task, taskB : Task) =>  new Date(taskA.date).getTime() - new Date(taskB.date).getTime(),
    );
    /*return list.filter(task => new Date(task.date).getTime() > new Date().getTime())*/
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
    console.log(task.date);
    if (task.date !== ''){
    this.task.date = (new Date(date).toLocaleString('es-AR'));
    console.log(this.task.date);
    this.taskList.push(task);
    this.taskList = this.filterAndSortTaskList(this.taskList);
    this.notificacion();
    this.showFormMethod();
  } else {
    this.openSnackBar("Debe ingresar una fecha")
  }
  }

  deleteTask(task:Task){
    console.log(task)
    this.taskList = this.taskList.filter(item => item !== task);
    this.notificacion();
    }
}
