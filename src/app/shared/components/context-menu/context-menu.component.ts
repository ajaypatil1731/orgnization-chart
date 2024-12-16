import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Employee } from '../../../models/employee.model';
@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent implements OnInit {
  @Input() employee!: Employee;
  @Input() iconShape: string = '';
  @Input() open: boolean = false;
  @ViewChild('ddTrigger', { static: true }) ddTrigger!: ElementRef;
  @Output() dismiss = new EventEmitter<void>();
  openAddReporteeModal = false;
  newReportee: Partial<Employee> = {};
  mode: string = '';

  ngOnInit(): void {
    if (this.open) {
      this.ddTrigger.nativeElement.click();
    }
  }

  openModal(mode: string) {
    this.mode = mode;
    this.openAddReporteeModal = true;
  }

  dismissed() {
    this.openAddReporteeModal = false;
    this.dismiss.emit();
  }
}
