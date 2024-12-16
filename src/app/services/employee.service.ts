import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient);

  getAllEmployees() {
    return this.http.get('assets/employee.json');
  }

  getEmployeeDesignations() {
    return this.http.get('assets/designations.json');
  }
}
