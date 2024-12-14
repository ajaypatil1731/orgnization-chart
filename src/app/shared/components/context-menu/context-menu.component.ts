import { Component, Input } from '@angular/core';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
  @Input({ required: true }) data!: Employee;
  @Input() iconShape: string = 'ellipsis-vertical';
  openAddReporteeModal = false;
  newReportee:Partial<Employee> = {};

  addNewReportee() {
    this.newReportee.reports_to = this.data.id;
    this.openAddReporteeModal = false;
  }
}
