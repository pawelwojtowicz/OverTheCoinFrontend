import { Component, OnInit } from '@angular/core';
import { SchoolClassService } from '../school-class.service';
import { SchoolClass } from '../school-class';
import { ClassDialogComponent } from '../class-dialog/class-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: SchoolClass[];

  constructor( private classService: SchoolClassService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
   }


  ngOnInit() {
    this.updateClassList();
  }

  updateClassList() {
    this.classService.getAllClasses().subscribe( (data: SchoolClass[]) => { this.classes = data; } );
  }

  addNewClass() {
    this.openClassDialog(null);
  }

  editClass( classId) {
    this.classService.getClassById(classId).subscribe( (classInfo: SchoolClass) => this.openClassDialog(classInfo));
  }

  deleteClass( classId ) {
    this.classService.deleteClass(classId).subscribe(() => this.updateClassList() );
  }

  openClassDialog( schoolClass: SchoolClass): void {
      const dialogRef = this.dialog.open(ClassDialogComponent, {
        width: '250px',
        data: schoolClass
      });

      dialogRef.afterClosed().subscribe(result => {
        if (undefined !== result) {
          console.log( 'saving -> ' + JSON.stringify(result));
          this.classService.saveSchoolClassInfo(result).subscribe(() => this.updateClassList());
        } else {
          console.log('no saving');
        }
      });
  }

}
