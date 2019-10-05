import { Component, OnInit } from '@angular/core';
import { SchoolClassService } from '../school-class.service';
import { SchoolClass } from '../school-class';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor( private classService: SchoolClassService ) { }

  classes : SchoolClass[];

  ngOnInit() {
    this.updateClassList();
  }

  updateClassList() {
    this.classService.getAllClasses().subscribe( (data: SchoolClass[]) => { this.classes = data; } );
  }
}
