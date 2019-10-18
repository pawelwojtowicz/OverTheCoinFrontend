import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User} from '../vobjects/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  dialogTitle: string;

  user: User;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public userId: number ,
              private userService: UserService) {
    if ( 0 === userId ) {
      this.dialogTitle = 'Add new user';
    } else {
      this.dialogTitle = 'Modify user';
    }
    this.user = new User();
    this.user.userId = userId;
  }


  ngOnInit() {
    if ( 0 !== this.userId) {
      this.updateUserInfo();
    }
  }

  updateUserInfo() {
    this.userService.getUserByUserId(this.user.userId ).subscribe( ( userInfo: User ) => { this.user = userInfo; } );
  }

  saveUser(): void {
    if ( this.userId === 0 ) {
      this.userService.addUser(this.user).subscribe(() => { this.dialogRef.close(true); } );
    } else {
      this.userService.modifyUser(this.user).subscribe(() => { this.dialogRef.close(true); } );
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
