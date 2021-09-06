/**
 * Title:  Nodebucket - Task Service
 * Author: Mark Watson
 * Date: 5 September 2021
 * Description: Task service for finding and creating tasks in Nodebucket.
**/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  /**
 * @param empId
 * @returns Employee data including tasks.
 */
  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  /**
   * @param empId
   * @param task
   */
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task,
    });
  }

  /**
   *
   * @param empId
   * @param toDo
   * @param done
   * @returns Updated employee record of tasks
   */
  updateTask(empId: number, toDo: Item[], done: Item []): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      toDo,
      done
    })
  }

  /**
   *
   * @param empId
   * @param taskId
   * @returns Updated employee record of tasks
   */
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }
}
