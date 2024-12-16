import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { designationAction } from '../actions/designation.action';
import { EmployeeService } from './../../services/employee.service';

@Injectable()
export class DesignationEffects {

  loadEmployeesDesignations$ = createEffect(() => this.actions$.pipe(
    ofType(designationAction.loadDesignation),
    exhaustMap(() => this.employeeService.getEmployeeDesignations()
      .pipe(
        map((data: any) => (designationAction.loadDesignationsSuccess({payload: data})
        )),
        catchError(() => of(designationAction.loadDesignationsFailure()))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}