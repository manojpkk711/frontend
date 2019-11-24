import { UserService } from './../shared/user.service';

import { ɵɵcontainerRefreshEnd, TemplateRef } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  
  productDataform: FormGroup;
  modalRef: BsModalRef;
  _id: any;
  http: any;
  errorMsg: string;
  name: any;
  pwd: any;

  constructor(private router: Router, private modalService: BsModalService, private fb: FormBuilder, private httpservice: HttpClient) { }
  Emp: any;

  ngOnInit() {
    this.httpservice.get('http://localhost:3000/api/productListController').subscribe(data => {
      this.Emp = data;
    });
    this.inItForm()
  }
  
  inItForm() {
    console.log(this.productDataform)
    this.productDataform = this.fb.group({
      product_name: '',
      link: '',
      username: '',
      password: ''
    });
  }

  openModal(template: TemplateRef<any>, data) {
    this.modalRef = this.modalService.show(template);
    if (data) {
      this._id = data._id;
      const value = {};
      value['product_name'] = data.product_name;
      value['link'] = data.link;
      value['username'] = this.name;
      value['password'] = this.pwd;
      this.productDataform.patchValue(value);
    }
  }

 

  delete(policy) {
    if (confirm("Are you sure to delete this user name" )) {
      const payload = {
        _id: policy._id
      }
      this.httpservice.post('http://localhost:3000/api/clearproductdata', payload).subscribe(res => { 
      console.log(res, 'delete result');
      window.location.reload();

        
      })
    }
  }

  // update(policy) {
  //   const payload = {
  //     _id: policy._id
  //   }
  //   this.httpservice.post('http://localhost:3000/api/updatecreatedata', payload).subscribe(res => {
  //     console.log(res, 'delete result');
  //   })
  // }

  // postUser() {
  //   const pname = this.productDataform.get('product_name').value;
  //   const link = this.productDataform.get('link').value;
  //   const uname = this.productDataform.value.users[0].username;
  //   const psw = this.productDataform.value.users[0].password;
  //   const product_name = this.productDataform.value.users[0].product_name;
  //   console.log(uname, 'usename');

  //   if ((pname && link) || (uname && psw)) {
  //     const value = this.productDataform.value;
  //     this.http.post('http://localhost:3000/api' + '/updatecreatedata', value).subscribe(res => {
  //       console.log(res);
  //     });
  //   } else {
  //     this.errorMsg = 'All Fields are required'
  //   }
  // }

  xyz() {
    this.productDataform.get('product_name').value;
    this.productDataform.get('link').value;
     this.productDataform.get('username').value;
     this.productDataform.get('password').value;
    // this.productDataform.value.users[0].username;
    // this.productDataform.value.this.selectedUser.username;
    // this.productDataform.value.users[0].password;
    let value = {}
    value = this.productDataform.value;
    value['_id'] = this._id;
    this.httpservice.post('http://localhost:3000/api/updateproductdata', value).subscribe(res => {
      console.log(res, 'update result');
    });
  }

  unitChanged(policy) {
    policy.users.forEach(User => {
      if (User.username === this.name) {
        const data = User.password;
        policy.psw = data;
        this.pwd= User.password
        console.log(User, 'password');
      }
    });
  }
}
