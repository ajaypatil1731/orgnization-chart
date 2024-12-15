import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
  @Input({ required: true }) employee!: Employee;
  @Input() iconShape: string = 'ellipsis-vertical';
  openAddReporteeModal = false;
  newReportee:Partial<Employee> = {};
  mode: string = '';

  openModal(mode: string) {
    this.mode = mode;
    this.openAddReporteeModal = true;
  }
}
