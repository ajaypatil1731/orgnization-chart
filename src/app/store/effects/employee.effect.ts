import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { employeeAction } from '../actions/empolyee.action';
import { EmployeeService } from './../../services/employee.service';

@Injectable()
export class EmployeeEffects {

  loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(employeeAction.loadEmployees),
    exhaustMap(() => this.employeeService.getAllEmployees()
      .pipe(
        map((data: any) => (employeeAction.loadEmployeesSuccess({payload: data})
        )),
        catchError(() => of(employeeAction.loadEmployeesFailure()))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}