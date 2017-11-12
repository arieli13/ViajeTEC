import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { MatSnackBar } from '@angular/material';

@Component ({
  selector: 'manage-administrator',
  templateUrl: './manage.administrator.component.html'
})

export class ManageAdministrator {
  constructor ( private as:AppService, private snackBar:MatSnackBar ) { }

  openSnackBar( message:string, action: string ) {
    this.snackBar.open( message, action, {
      duration: 2000,
    });
  }

  private get administrators () {
    return this.as.getAdministrators ();
  }

  private active = this.administrators[0] != null ? this.administrators[0] : null;

  private editAdmin () {
    let index = this.administrators.indexOf (this.active);
    this.as.editAdministrator ( index, this.active );

    this.openSnackBar ( "Data has been updated", "Ok" );
  }

  private removeAdmin () {
    let index = this.administrators.indexOf (this.active);
    this.as.removeAdministrator ( index );
    this.active = this.administrators[0] != null ? this.administrators[0] : null;

    this.openSnackBar ( "The administrator has been deleted", "Ok" );
  }
}
