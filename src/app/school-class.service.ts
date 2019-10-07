import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getBackendAddress } from '../app/app.config';
import { SchoolClass } from '../app/school-class';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {
  private serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = 'http://' + getBackendAddress() + '/class';
  }

  saveSchoolClassInfo( schoolClass: SchoolClass) {
    return  this.http.post(this.serviceURL, schoolClass);
  }

  getClassById( classId ) {
    const targetUrl = this.serviceURL + '/' + classId;
    console.log('getting the class with ID' + classId);
    return this.http.get(targetUrl);
  }

  getAllClasses() {
    return this.http.get( this.serviceURL + 'es');
  }

  deleteClass( classId: number ) {
    const targetUrl = this.serviceURL + '/' + classId;
    return this.http.delete( targetUrl );
  }
}
