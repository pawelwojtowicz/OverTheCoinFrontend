import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getBackendAddress } from '../app.config';
import { User } from '../vobjects/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serviceUrl: string;

  constructor(public httpClient: HttpClient) {
    this.serviceUrl = 'http://' + getBackendAddress() + '/user';
  }

  addUser( user: User) {
    return  this.httpClient.post(this.serviceUrl, user);
  }

  modifyUser( user: User) {
    return this.httpClient.put(this.serviceUrl, user);
  }

  getUserByUserId( userId: number ) {
    const finalUrl = this.serviceUrl + '/' + userId;
    return this.httpClient.get( finalUrl );
  }

  getAllUsers() {
    return this.httpClient.get(this.serviceUrl);
  }

  deleteUserById(userId: number) {
    const finalUrl = this.serviceUrl + '/' + userId;
    console.log('deleting - ' + finalUrl);
    return this.httpClient.delete( finalUrl );
  }



}
