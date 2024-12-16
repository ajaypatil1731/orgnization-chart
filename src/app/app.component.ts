import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { Employee } from './models/employee.model';
import { employeeAction } from './store/actions/empolyee.action';
import { Designation } from './models/designation.model';
import { designationAction } from './store/actions/designation.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Orgnization Chart';
  selectedValue = 'graph-view';
  
  constructor(private router: Router, private store: Store<{employee: Employee[], designation: Designation[]}>) {

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.selectedValue = this.router.url.indexOf('grid-view') !== -1 ? 'grid-view' : 'graph-view';
    });
    this.store.dispatch(employeeAction.loadEmployees());
    this.store.dispatch(designationAction.loadDesignation());
  }

  changeView() {
    this.router.navigateByUrl(this.selectedValue);
  }

}
