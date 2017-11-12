import { Injectable } from '@angular/core';

@Injectable ()
export class AppService {
  private administrators = [
    { name: "Pablo", lastname: "Navarro", email: "pablo@admin.com" },
    { name: "Ariel", lastname: "Rodríguez", email: "ariel@admin.com" },
    { name: "Eros", lastname: "Hernández", email: "eros@admin.com" },
  ]

  private fuelPrices = {
    super:   565,
    regular: 470,
    diesel:  435
  }

  public getAdministrators () {
    return this.administrators;
  }

  public addAdministrator ( newAdmin:any ) {
    this.administrators.push (newAdmin);
  }

  public removeAdministrator ( index:number ) {
    this.administrators.splice (index, 1);
  }

  public editAdministrator ( index, newData ) {
    this.administrators[index] = newData;
  }

  public getFuelPrices () {
    return this.fuelPrices;
  }

  public editFuelPrice ( fuel, price ) {
    this.fuelPrices[fuel] = price;
  }
}
