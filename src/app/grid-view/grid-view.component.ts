import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Store } from '@ngrx/store';
import { allEmployees } from '../store/selectors/employee.selector';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent {
  employees$: Observable<Employee[]>;
  selected: Employee[] = [];
  
  constructor(private store: Store<{ employee: Employee[] }>) {
    this.employees$ = store.select(allEmployees);
  }
}
