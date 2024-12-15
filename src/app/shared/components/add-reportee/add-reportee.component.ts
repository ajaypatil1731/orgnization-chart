import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addEmployee, updateEmployee } from '../../../store/actions/empolyee.action';

@Component({
  selector: 'app-add-reportee',
  templateUrl: './add-reportee.component.html',
  styleUrl: './add-reportee.component.scss'
})
export class AddReporteeComponent implements OnInit {
  @Input({required: true}) employee!: Employee;
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() dismiss = new EventEmitter();
  @Output() add = new EventEmitter<Employee>();
  reportee: Employee = {
    name: '',
    position: '',
    designation: '',
    id: '',
    email: '',
    phone: '',
    reports_to: '',
    manager: ''
  };
  openAddReporteeModal = true;
  empForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    if(this.mode === 'edit') {
      Object.assign(this.reportee, this.employee);
    }
    this.createFormControls();
  }

  addNewReportee() {
    this.empForm.markAllAsTouched();
    if(this.empForm.invalid) {
      console.log('Invalid');
      return;
    }
       
    Object.assign(this.reportee, this.empForm.value);
    if(this.mode === 'add') {
      this.reportee.reports_to = this.employee.id;
      this.reportee.manager = this.employee.name;
      this.store.dispatch(addEmployee({ payload: this.reportee }));
    } else {
      this.store.dispatch(updateEmployee({ payload: this.reportee }));
    }
    this.openAddReporteeModal = false;
  }

  private createFormControls() {
    this.empForm = this.formBuilder.group({
      name: [this.reportee.name || '', Validators.required],
      designation: [this.reportee.designation || '', Validators.required],
      email: [this.reportee.email || '', [Validators.required, Validators.pattern( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: [this.reportee.phone, Validators.required],
    });
  }

  dismissModal() {
    this.openAddReporteeModal = false;
    this.dismiss.emit();
  }


}
