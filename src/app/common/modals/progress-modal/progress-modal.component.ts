import { Component, OnInit, Inject, Injectable } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

export interface ProgressData {
  title: string,
  message: string,
  promise: any
}

@Injectable({
  providedIn: 'root',
})

export class ProgressModal {

  progressData: ProgressData;

  constructor(public dialog: MatDialog) {
    this.progressData = {
      title: "",
      message: "",
      promise: ""
    }
  }

show(title: string, message: string, promise: any): void {
    this.progressData.title = title;
    this.progressData.message = message;
    this.progressData.promise = promise;

    const dialogRef = this.dialog.open(ProgressDialog, {
      width: '500px',
      data: this.progressData
    });

dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log("Yes clicked!");
        promise();
      }
      else{
        console.log("False result");

      }
    });
  }
}

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.tpl.html'
})
export class ProgressDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: ProgressData) {}
}
