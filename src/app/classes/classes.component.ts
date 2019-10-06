import { Component, OnInit } from '@angular/core';
import { SchoolClassService } from '../school-class.service';
import { SchoolClass } from '../school-class';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: SchoolClass[];

  constructor( private classService: SchoolClassService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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

  editClass( classId) {
    alert( ' editing class ' + classId);
  }

  deleteClass( classId ) {
    alert('deleting ID=' + classId);
  }
}
