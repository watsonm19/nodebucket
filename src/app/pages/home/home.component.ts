/**
 * Title:  Nodebucket - Home Page
 * Author: Mark Watson
 * Date: 29 August 2021
 * Description: Home component for Nodebucket.
**/

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './../../shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee: Employee;
  toDo: Item[];
  done: Item[];
  empId: number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    // use findAllTasks from taskService
    this.taskService.findAllTasks(this.empId).subscribe((res) => {
        console.log('-- Server response from findAllTasks API --');
        console.log(res);
        // set the todo and done arrays to the server response
        this.employee = res;
        console.log('-- Employee Object--');
        console.log(this.employee);
      },
      // if error
      (err) => {
        console.log('--Server error--');
        console.log(err);
      },
      () => {
        // set the toDo and done arrays to equal the response object
        console.log('--onComplete of the findAllTasks service call--');
        this.toDo = this.employee.toDo;
        this.done = this.employee.done;

        console.log('--To do tasks--');
        console.log(this.toDo);

        console.log('--Done tasks--');
        console.log(this.done);
      }
    );
  }

  ngOnInit(): void {}

  // opens the dialog to create a new task
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    // create a new task after the dialog closes
    dialogRef.afterClosed().subscribe((data) => {
      // if the user clicks the create task button
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe((res) => {
            this.employee = res;
          },
          // if error
          (err) => {
            console.log('--onError of the createTask service call--');
            console.log(err);
          },
          // if successful - set the toDo and done arrays to the response object
          () => {
            this.toDo = this.employee.toDo;
            this.done = this.employee.done;
          }
        );
      }
    });
  }
}
