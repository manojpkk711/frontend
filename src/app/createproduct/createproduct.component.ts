import { Component, OnInit, ɵɵcontainerRefreshEnd, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})


export class CreateproductComponent implements OnInit {
  _id: any;
  [x: string]: any;
  editForm: FormGroup;
  modalRef: BsModalRef;
  loginForm: FormGroup;

  constructor(private _router: Router, private httpservice: HttpClient,
    private fb: FormBuilder,
    private modalService: BsModalService, private formBuilder: FormBuilder) { }
  Emp: any;

  ngOnInit() {
    this.httpservice.get('http://localhost:3000/api/createlogin').subscribe(data => {
      this.Emp = data;
    });
    this.editForm = this.fb.group({
      product_name: '',
      client_name: '',
      username: '',
      password: '',
      time: ''
    })
  }

  openModal(template: TemplateRef<any>, data) {
    this.modalRef = this.modalService.show(template);
    if (data) {

      this._id = data._id;
      const value = {};
      value['product_name'] = data.product_name;
      value['client_name'] = data.client_name;
      value['username'] = data.username;
      value['password'] = data.password;
      value['time'] = data.time;
      this.editForm.patchValue(value);



      // this.editForm.patchValue(data);
      // this._id = data._id;
      // value['password'] = this.pwd;
    }
  }

  delete(policy) {
    if(confirm("Are you sure to delete "+ name)) {
    const payload = {
      _id: policy._id
    }
    this.httpservice.post('http://localhost:3000/api/deletedata', payload).subscribe(res => {
      console.log(res, 'delete result');
      window.location.reload();
    })
  }
  }


  xyz() {
    // const product_namesss = this.editForm.get('product_name').value;
    // const client_name = this.editForm.get('client_name').value;
    // const username = this.editForm.get('username').value;
    // const password = this.editForm.get('password').value;
    // const time = this.editForm.get('time').value;
    let value = {}
    value = this.editForm.value;
    value['_id'] = this._id;
    this.httpservice.post('http://localhost:3000/api/updatecreatedata', value).subscribe(res => {
      console.log(res, 'update result');
    });
  }
}
