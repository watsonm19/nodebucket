/**
 * Title:  Nodebucket - Home Page
 * Author: Mark Watson
 * Date: 5 September 2021
 * Description: Home component for Nodebucket.
**/

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './../../shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  /**
    * Drag and drop function - allows user to re-organize tasks
    */
   drop(event: CdkDragDrop<any[]>) {
     if (event.previousContainer === event.container) {
       moveItemInArray(
         event.container.data,
         event.previousIndex,
         event.currentIndex
       );

       console.log('Re-ordered the existing list of task items.');

       // updates the list of tasks
       this.updateTaskList(this.empId, this.toDo, this.done);
     } else {
       // allows transferring items between toDo and done
       transferArrayItem(
         event.previousContainer.data,
         event.container.data,
         event.previousIndex,
         event.currentIndex
       );

       console.log('Moved task item into the another list');

       // updates the list of tasks
       this.updateTaskList(this.empId, this.toDo, this.done);
     }
   }

   /**
    *
    * @param taskId
    * Delete tasks
    */
   deleteTask(taskId: string): void {
    // asks for confirmation of deletion
    if (confirm('Are you sure you want to delete this task?')) {
      if (taskId) {
        // log task id that was deleted
        console.log(`Task item: ${taskId} was deleted`);

        this.taskService.deleteTask(this.empId, taskId).subscribe((res) => {
          this.employee = res.data;
          }, (err) => {
            console.log(err);
          },   () => {
          this.toDo = this.employee.toDo;
          this.done = this.employee.done;
          });
        }
      }
    }

   /**
    * @param empId
    * @param toDo
    * @param done
    * Update tasks
    */
   private updateTaskList(empId: number, toDo: Item[], done: Item[]): void {
     this.taskService.updateTask(this.empId, this.toDo, this.done).subscribe((res) => {
        this.employee = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.toDo = this.employee.toDo;
        this.done = this.employee.done;
      });
    }
  }
