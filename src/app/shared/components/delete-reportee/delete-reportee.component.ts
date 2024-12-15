import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-delete-reportee',
  templateUrl: './delete-reportee.component.html',
  styleUrl: './delete-reportee.component.scss'
})
export class DeleteReporteeComponent {
  @Input({required: true}) employee!: Employee;
  @Output() dismiss = new EventEmitter();
  openAddReporteeModal = true;
  showConfirm = false;
  
  dismissModal() {
    this.openAddReporteeModal = false;
    this.dismiss.emit();
  }

  deleteEmployee() {
    this.showConfirm = false;
    this.dismissModal();
    //Update store from here
  }
}