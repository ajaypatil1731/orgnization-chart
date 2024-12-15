import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-change-reportee-line-manager',
  templateUrl: './change-reportee-line-manager.component.html',
  styleUrl: './change-reportee-line-manager.component.scss'
})
export class ChangeReporteeLineManagerComponent {

  @Input({required: true}) employee!: Employee;
  @Output() dismiss = new EventEmitter();
  @Output() change = new EventEmitter<Employee>();
  reportee: Partial<Employee> = {
    designation: ''
  };
  openAddReporteeModal = true;
  empForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createFormControls();
  }

  addNewReportee() {
    this.empForm.markAllAsTouched();
    if(this.empForm.invalid) {
      console.log('Invalid');
      return;
    }
    // update store from here
    //this.openAddReporteeModal = false;
  }

  private createFormControls() {
    this.empForm = this.formBuilder.group({
      manager: ['', Validators.required],
    });
  }

  changeManager() {
    // Change store from Here
    this.dismissModal();
  }

  dismissModal() {
    this.openAddReporteeModal = false;
    this.dismiss.emit();
  }
}
