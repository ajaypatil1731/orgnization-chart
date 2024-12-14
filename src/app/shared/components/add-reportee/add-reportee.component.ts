import { Component, Input } from '@angular/core';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-add-reportee',
  templateUrl: './add-reportee.component.html',
  styleUrl: './add-reportee.component.scss'
})
export class AddReporteeComponent {
  @Input({required: true}) manager!: Employee;
  newReportee: Partial<Employee> = {};
  @Input() openAddReporteeModal = false;
  addNewReportee() {
    this.newReportee.reports_to = this.manager.id;
    this.openAddReporteeModal = false;
  }
}
