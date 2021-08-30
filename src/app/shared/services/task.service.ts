/**
 * Title:  Nodebucket - Task Service
 * Author: Mark Watson
 * Date: 29 August 2021
 * Description: Task service for finding and creating tasks in Nodebucket.
**/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
