import { Component } from '@angular/core';
import { employee } from '../Model/employee';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../shared/service.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  obj:employee = new employee();

  employeeform!:FormGroup;

  isEdit:boolean = false;

  constructor(private fb:FormBuilder,public service:ServiceService){
    service.editCallback$.subscribe(emp => {
      console.log(emp);
      this.obj = emp;
      this.isEdit = true;
    })
   }
  
  // this.service.updateUser(this.user).subscribe(data1 => {
  //   this.getUsers();         
  emailpattern!:"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  namepattern!:"^[a-zA-Z ]{2,20}$";

  ngOnInit()
  {
    this.employeeform=this.fb.group
    ({
      empId:['',[Validators.required]],
      fname:['',[Validators.required,Validators.pattern(this.namepattern)]],
      lname:['',[Validators.required,Validators.pattern(this.namepattern)]],
      gender:['',[Validators.required]],
      phoneno:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email:['',[Validators.required,Validators.pattern(this.emailpattern)]]
    })
  }

  onSubmit(emp:employee)
  {
    if(!this.isEdit) {
      this.service.postData(emp)
        .subscribe(response => {
            console.log(response)
      })
    }
    else {
      this.service.updateData(emp).subscribe(response => {
        console.log(response);
      })
    }
  }
  onReset()
  {
      this.obj.firstName='';
      this.obj.lastName='';
      this.obj.emailId="";
      this.obj.phoneNumber=0;
      this.obj.gender='';
  }
}
