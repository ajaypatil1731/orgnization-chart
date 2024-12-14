import { createReducer } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

const initialState: Employee[] = [
          {
            "designation": "ceo",
            "position": "Chief Executive Officer(CEO)",
            "name": "John Doe",
            "email": "john.doe@company.com",
            "phone": "+1 123-456-7890",
            "reports_to": "01012168",
            "id": "01012168"
          },
          {
            "designation": "head",
            "position": "Head of Engineering",
            "name": "Sarah Lee",
            "email": "sarah.lee@company.com",
            "phone": "+1 123-456-7891",
            "reports_to": "01012168",
            "id": "01012169"
          },
          {
            "designation": "head",
            "position": "Head of Sales",
            "name": "Michael Brown",
            "email": "michael.brown@company.com",
            "phone": "+1 123-456-7892",
            "reports_to": "01012168",
            "id": "01012170"
          },
          {
            "designation": "head",
            "position": "Head of Marketing",
            "name": "Emily Devis",
            "email": "emily.devis@company.com",
            "phone": "+1 123-456-7893",
            "reports_to": "01012168",
            "id": "01012171"
          },
          {
            "designation": "manager",
            "position": "Engineering Manager",
            "name": "James Carter",
            "email": "james.carter@company.com",
            "phone": "+1 123-456-7894",
            "reports_to": "01012169",
            "id": "01012172"
          },
          {
            "designation": "ux-engg",
            "position": "Product UX Engineer",
            "name": "Esther Liukkonen-Olmiala",
            "email": "esther@company.com",
            "phone": "+1 123-456-7895",
            "reports_to": "01012169",
            "id": "01012173"
          },
          {
            "designation": "devops-engg",
            "position": "DevOps Engineer",
            "name": "Ethan Wright",
            "email": "ethan.wright@company.com",
            "phone": "+1 123-456-7896",
            "reports_to": "01012169",
            "id": "01012174"
          },
          {
            "designation": "sales-engg",
            "position": "Sales Executive",
            "name": "Ava Johnson",
            "email": "ava.johnson@company.com",
            "phone": "+1 123-456-7897",
            "reports_to": "01012170",
            "id": "01012176"
          }
];     

export const employeeReducer = createReducer(initialState);