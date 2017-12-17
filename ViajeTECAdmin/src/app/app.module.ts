import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouteHandler } from './app.routes';

//ANGULAR MATERIAL MODULES
import { MatButtonModule, MatInputModule, MatIconModule, MatSnackBarModule } from '@angular/material';

//COMMON COMPONENTS IMPORTS
import { HeaderComponent } from './common';

//APP COMPONENTS IMPORTS
import { LoginComponent } from './login/login.component';
import {
  DashboardComponent, ArchivedReport, ClosedReport, NewReport,
  AddAdministrator, ManageAdministrator, FuelSettings
} from './dashboard'

//APP SERVICES IMPORTS
import { RestService } from './services/rest.service';
import { AppService } from './services/app.service';

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    DashboardComponent, ArchivedReport, ClosedReport, NewReport,
    AddAdministrator, ManageAdministrator, FuelSettings,

    HeaderComponent,

  ],
  imports: [
    BrowserAnimationsModule, BrowserModule, FormsModule,

    //Angular Material Modules
    MatButtonModule, MatInputModule, MatIconModule, MatSnackBarModule,

    RouterModule.forRoot (
      RouteHandler, { useHash: false, preloadingStrategy: PreloadAllModules }
    ),
    BrowserModule
  ],
  providers: [
    RestService, AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
