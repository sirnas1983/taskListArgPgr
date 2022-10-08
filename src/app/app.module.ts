import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ListOfTasksComponent } from './list-of-tasks/list-of-tasks.component';
import { ItemOfListComponent } from './item-of-list/item-of-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GetTaskListService } from './services/get-task-list.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    ListOfTasksComponent,
    ItemOfListComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [GetTaskListService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
 }
