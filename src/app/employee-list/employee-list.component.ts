import { Component } from '@angular/core';
import { employee } from '../Model/employee';
import { EmployeeComponent } from '../employee/employee.component';
import {FormsModule} from '@angular/forms'
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  employeeList: employee[] = [];
   constructor(private service:ServiceService){ }
   
   ngOnInit():void
   {
    this.service.getAllData().subscribe((data:employee[]) => {
      this.employeeList = data;
    })
   }

   onUpdate(emp:employee)
   {
      this.service.onEdit(emp);
   }
   onDelete(empId:number)
   {
      this.service.deleteData(empId).subscribe();
   }

}
