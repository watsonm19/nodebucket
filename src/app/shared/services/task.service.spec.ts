/**
 * Title:  Nodebucket - Task Service
 * Author: Mark Watson
 * Date: 29 August 2021
 * Description: Task service specs for Nodebucket.
**/

import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
