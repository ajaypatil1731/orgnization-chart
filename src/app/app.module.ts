import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { ClarityIcons, userIcon, homeIcon, worldIcon, usersIcon, gridViewIcon } from '@cds/core/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/effects/employee.effect';
import { HttpClientModule } from '@angular/common/http';
import { designationReducer } from './store/reducers/designations.reducer';
import { DesignationEffects } from './store/effects/designation.effect';
import { employeeReducer } from './store/reducers/employee.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    CdsModule,
    StoreModule.forRoot({ 
      employee: employeeReducer,
      designation: designationReducer
    }),
    EffectsModule.forRoot(EmployeeEffects, DesignationEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, // Stack trace for every dispatched action (disabled in this case)
      traceLimit: 75, // Maximum stack trace frames stored when trace is enabled
      connectInZone: true // Ensures connection within Angular zone
    }),
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { 
  constructor() {
    ClarityIcons.addIcons(userIcon, homeIcon, worldIcon, usersIcon, gridViewIcon);
  }
}
