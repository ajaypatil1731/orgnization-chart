import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent {
  employees$: Observable<Employee[]>;
  //users: User[]; 
  selected: Employee[] = []; 
  state: Employee | undefined;
  constructor(private store: Store<{employee: Employee[]}>) {
    this.employees$ = store.select('employee');
  }

  openContextMenu(emp: Employee) {
    console.log(emp);
  }

}
