import { Component, OnInit } from '@angular/core';
import { User } from '../vobjects/user';
import { UserService } from '../services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];


  constructor(  private userService: UserService,
                iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer,
                public dialog: MatDialog) { 
                  iconRegistry.addSvgIcon(
                    'delete',
                    sanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));
                  iconRegistry.addSvgIcon(
                    'edit',
                    sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
                }

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
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '50%',
      data: userId
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        console.log( 'saving data-> ' + JSON.stringify(result));
        this.updateUsersList();
      }
    });
  }

}
