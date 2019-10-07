import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SchoolClass } from '../school-class';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.css']
})
export class ClassDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ClassDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public classRecord: SchoolClass) {
    if (null !== classRecord) {
      classRecord = new SchoolClass();
    }
  }

  ngOnInit() {
    console.log(JSON.stringify(this.classRecord));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
