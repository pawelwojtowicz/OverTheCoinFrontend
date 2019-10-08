import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SchoolClassService } from '../school-class.service';
import { SchoolClass } from '../school-class';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.css']
})
export class ClassDialogComponent implements OnInit {
  dialogTitle: string;

  classRecord: SchoolClass;

  constructor( public dialogRef: MatDialogRef<ClassDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public classId: number,
               private classService: SchoolClassService
               ) {
    if (0 === classId) {
      this.dialogTitle = 'Add new class';
    } else {
      this.dialogTitle = 'Modify class info';
    }
    this.classRecord = new SchoolClass();
    this.classRecord.classId = classId;
  }

  ngOnInit() {
    if ( 0 !== this.classId ) {
      this.classService.getClassById(this.classId).subscribe( (classInfo: SchoolClass) => { this.classRecord = classInfo; });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  saveClass(): void {
    this.classService.saveSchoolClassInfo(this.classRecord).subscribe(() => this.dialogRef.close(true) );
  }

}
