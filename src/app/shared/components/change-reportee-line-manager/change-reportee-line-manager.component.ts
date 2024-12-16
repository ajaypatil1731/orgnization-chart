import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getManagerForEmployee } from '../../../store/selectors/employee.selector';
import { employeeAction } from '../../../store/actions/empolyee.action';

@Component({
  selector: 'app-change-reportee-line-manager',
  templateUrl: './change-reportee-line-manager.component.html',
  styleUrl: './change-reportee-line-manager.component.scss'
})
export class ChangeReporteeLineManagerComponent {

  @Input({required: true}) employee!: Employee;
  @Output() dismiss = new EventEmitter();
  @Output() change = new EventEmitter<Employee>();
  managerList$?: Observable<Employee[]>;
  reportee: Partial<Employee> = {
    designation: ''
  };
  openAddReporteeModal = true;
  empForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store<{employee: Employee[]}>) {}


  ngOnInit(): void {
    this.managerList$ = this.store.select(getManagerForEmployee(this.employee));
    this.createFormControls();
  }

  private createFormControls() {
    this.empForm = this.formBuilder.group({
      manager: ['', Validators.required],
    });
  }

  changeManager() {
    this.empForm.markAllAsTouched();
    if(this.empForm.invalid) {
      return;
    }
    Object.assign(this.reportee, this.employee);
    this.reportee.parentId = this.empForm.controls['manager'].value;
    this.store.dispatch(employeeAction.changeReporteeManager({payload: this.reportee as Employee}))
    this.dismissModal();
  }

  dismissModal() {
    this.openAddReporteeModal = false;
    this.dismiss.emit();
  }
}
