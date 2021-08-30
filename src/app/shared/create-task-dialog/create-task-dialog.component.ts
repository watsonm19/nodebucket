/**
 * Title:  Nodebucket - Create Task Dialog
 * Author: Mark Watson
 * Date: 29 August 2021
 * Description: Dialog box component for Nodebucket.
**/

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  // create task dialog pop up
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  // cancel and close window
  cancel() {
    this.dialogRef.close();
  }
}
