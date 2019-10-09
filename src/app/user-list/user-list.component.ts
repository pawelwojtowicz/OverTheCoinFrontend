import { Component, OnInit } from '@angular/core';
import { User } from '../vobjects/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.updateUsersList();
  }

  updateUsersList() {
    this.userService.getAllUsers().subscribe( (users: User[]) => { this.userList = users; });
  }

  addNewUser() {
    this.openUserEditDialog(0);
  }

  modifyUser( userId: number) {
    this.openUserEditDialog( userId );
  }

  deleteUserById( userId: number) {
    this.userService.deleteUser(userId);
  }

  openUserEditDialog( userId: number) {

  }

}
