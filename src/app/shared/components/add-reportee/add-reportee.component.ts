import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { employeeAction } from '../../../store/actions/empolyee.action';
import { Designation } from '../../../models/designation.model';
import { map, Observable, Subscription } from 'rxjs';
import { allDesignations, getDesignation } from '../../../store/selectors/designation.selector';
import { UtilityService } from '../../../services/utility.service';
@Component({
  selector: 'app-add-reportee',
  templateUrl: './add-reportee.component.html',
  styleUrl: './add-reportee.component.scss'
})
export class AddReporteeComponent implements OnInit {
  @Input({ required: true }) employee!: Employee;
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() dismiss = new EventEmitter<void>();
  @Output() add = new EventEmitter<Employee>();
  designations$: Observable<Designation[]>;
  filteredDesignations$?: Observable<Designation[]>;
  subscriptions$: Subscription[] = [];
  reportee: Employee = {
    name: '',
    position: '',
    designation: '',
    id: '',
    email: '',
    phone: '',
    parentId: '',
    manager: ''
  };
  openAddReporteeModal = true;
  empForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ employee: Employee[], designation: Designation[] }>,
    private utilitiService: UtilityService
  ) {
    this.designations$ = this.store.select(allDesignations);
  }

  ngOnInit(): void {
    this.filteredDesignations$ = this.store.select(getDesignation(this.employee.designation));
    if (this.mode === 'edit') {
      Object.assign(this.reportee, this.employee);
    }
    this.createFormControls();
  }

  addNewReportee() {
    this.empForm.markAllAsTouched();
    if (this.empForm.invalid) {
      return;
    }
    Object.assign(this.reportee, this.empForm.value);
    this.subscriptions$?.push(
      this.getPositionTitle(this.reportee.designation).subscribe((position: string) => {
        this.reportee.position = position;
        if (this.mode === 'add') {
          this.reportee.parentId = this.employee.id;
          this.reportee.manager = this.employee.name;
          this.reportee.id = this.utilitiService.generateEmployeeId(); // Generate a new ID for the reportee
          // Dispatch the add action to the store
          this.store.dispatch(employeeAction.add({ payload: this.reportee }));
        } else {
          // Otherwise, dispatch the update action
          this.store.dispatch(employeeAction.update({ payload: this.reportee }));
        }
        this.openAddReporteeModal = false;
      }));
  }

  private getPositionTitle(designation: string) {
    return this.designations$.pipe(
      map((designations: Designation[]) => {
        const dsgn = designations.find(item => item.designation === designation);
        if (dsgn) {
          return dsgn.position; // Return the position title for the found designation
        }
        return ''; // Return an empty string if no designation is found
      }));
  }

  private createFormControls() {
    this.empForm = this.formBuilder.group({
      name: [this.reportee.name || '', Validators.required], // Name is required
      designation: [this.reportee.designation || '', Validators.required], // Designation is required
      email: [this.reportee.email || '', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) // Email validation regex
      ]],
      phone: [this.reportee.phone, Validators.required], // Phone is required
    });

    // If in 'edit' mode, disable the email field to prevent changes
    if (this.mode === 'edit') {
      this.empForm.controls['email'].disable();
    }
  }

  dismissModal() {
    this.openAddReporteeModal = false; // Close the modal
    this.dismiss.emit(); // Emit the dismiss event
  }
}
