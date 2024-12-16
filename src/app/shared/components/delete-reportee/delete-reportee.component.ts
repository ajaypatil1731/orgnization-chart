import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { employeeAction } from '../../../store/actions/empolyee.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-delete-reportee',
  templateUrl: './delete-reportee.component.html',
  styleUrls: ['./delete-reportee.component.scss']
})
export class DeleteReporteeComponent {
  @Input({ required: true }) employee!: Employee;
  @Output() dismiss = new EventEmitter<void>();
  openAddReporteeModal = true;
  showConfirm = false;
  constructor(private store: Store<{ employee: Employee[] }>) {}

  dismissModal() {
    this.openAddReporteeModal = false;  
    this.dismiss.emit();
  }

  deleteEmployee() {
    this.showConfirm = false;
    // Dispatch the delete action to remove the employee from the store
    this.store.dispatch(employeeAction.delete({ payload: this.employee }));
    this.dismissModal();
  }
}
