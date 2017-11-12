import { Component } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { MatSnackBar } from '@angular/material';

@Component ({
  selector: 'add-administrator',
  templateUrl: './add.administrator.component.html'
})

export class AddAdministrator {

  constructor ( private as:AppService, private snackBar:MatSnackBar ) { }

  openSnackBar( message:string, action: string ) {
    this.snackBar.open( message, action, {
      duration: 2000,
    });
  }

  private addAdmin ( name, lastname, email ) {
    if (!name || !lastname || !email)
      this.openSnackBar ( "Al fields are needed", "Ok" );

    else {
      this.as.addAdministrator ( { name: name, lastname: lastname, email:email } );
      this.openSnackBar ( "The administrator has been created", "Ok" );
    }
  }

}
