import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-popassignproducts',
  templateUrl: './popassignproducts.component.html',
  styleUrls: ['./popassignproducts.component.css']
})
export class PopassignproductsComponent implements OnInit {


  loginForm: FormGroup;
  users: any;
  psw: any;
  username: any;
  password:any;
  jname: any;
  Emp: any;
  Full: any;
  name: any;

  constructor(private userService: CustomerService, private _router: Router,
    private httpservice: HttpClient, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.xyz();
    this.getData();
    this.getFullname();
  }

  getData() {
    this.httpservice.get('http://localhost:3000/api/productListController').subscribe(data => {
      this.Emp = data;
      console.log("product ", this.Emp.data);
    })
  }

  getFullname() {
    this.httpservice.get('http://localhost:3000/api/getRegisterData').subscribe(user => {
      this.Full = user;
      console.log("Hello user", this.Full);
    })
  }

  xyz() {
    this.loginForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      client_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      time: ['', Validators.required],
    })
  }

  postUser() {
    this.userService.postUser(this.loginForm.value).subscribe(res => {
      console.log("data user  ",res);
    })
  }

  datachanged() {

    this.Emp.data.forEach(emp => {
      if (emp.product_name === this.name) {
        this.users = emp.users;
      }
    });
  }

  refresh(){
    window.location.reload();
  }

  pwdchanged() {
    this.users.forEach(emp => {
      if (emp.username === this.jname) {
        this.psw = emp.password;
      }
    });
  }
}