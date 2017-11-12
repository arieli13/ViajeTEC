import { Component } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { MatSnackBar } from '@angular/material';

@Component ({
  selector: 'fuel-settings',
  templateUrl: './fuel.settings.component.html'
})

export class FuelSettings {
  constructor ( private as:AppService, private snackBar:MatSnackBar ) { }

  openSnackBar( message:string, action: string ) {
    this.snackBar.open( message, action, {
      duration: 2000,
    });
  }

  private get fuelPrices () {
    return this.as.getFuelPrices ();
  }

  private editPrice ( fuel, price) {
    this.as.editFuelPrice (fuel, price);
    this.openSnackBar ( `Fuel price for ${fuel} has been updated`, 'Ok')
  }
}
