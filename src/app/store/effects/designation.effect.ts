import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { designationAction } from '../actions/designation.action';
import { EmployeeService } from './../../services/employee.service';

@Injectable()
export class DesignationEffects {

  //Effect that listens for the 'Load Designation' action and triggers an HTTP request to fetch employee designations.
  loadEmployeesDesignations$ = createEffect(() => this.actions$.pipe(
    ofType(designationAction.loadDesignation), // Listen for the action to load designations
    exhaustMap(() => this.employeeService.getEmployeeDesignations()  // Make an HTTP request to fetch designations
      .pipe(
        map((data: any) => (designationAction.loadDesignationsSuccess({payload: data}))),
        catchError(() => of(designationAction.loadDesignationsFailure())) // Dispatch failure action on error
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}