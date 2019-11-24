import { Component, OnInit } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgForm, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { EditServiceService } from 'src/app/shared/edit-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-popcreateproducts',
  templateUrl: './popcreateproducts.component.html',
  styleUrls: ['./popcreateproducts.component.css']
})

export class PopcreateproductsComponent implements OnInit {
  selectControl: FormControl = new FormControl()
  showSucessMessage: boolean;
  serverErrorMessages: string;
  loginForm: FormGroup;
  errorMsg = '';

  constructor(private editService: EditServiceService, private _router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    this.inItForm();
  }

  inItForm() {
    console.log(this.loginForm)
    this.loginForm = this.fb.group({
      product_name: '',
      link: '',
      users: this.fb.array([this.userFormGroup()])
    });
  }

  userFormGroup() {
    return this.fb.group({
      username: '',
      password: ''
    });
  }

  get UsersArray() {
    return this.loginForm.get('users') as FormArray;
  }

  addUser() {
    this.UsersArray.push(this.userFormGroup());
  }

  deleteUser() {
    const index = this.UsersArray.length;
    this.UsersArray.removeAt(index - 1);
  }

  onSubmit() {
    const pname = this.loginForm.get('product_name');
    const link = this.loginForm.get('link');
    const uname = this.UsersArray.controls[0].get('username');
    const psw = this.loginForm.controls[0].get('password');
    if ((pname && link) || (uname && psw)) {
      const value = this.loginForm.value;
      this.editService.postUser(value).subscribe(
        res => {
          this.showSucessMessage = true;
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
    }
  }
  
  postUser() {
    const pname = this.loginForm.get('product_name').value;
    const link = this.loginForm.get('link').value;
    const uname = this.loginForm.value.users[0].username;
    const psw = this.loginForm.value.users[0].password;
    const product_name = this.loginForm.value.users[0].product_name;
    console.log(uname, 'usename');

    if ((pname && link) || (uname && psw)) {
      const value = this.loginForm.value;
      this.http.post('http://localhost:3000/api' + '/productListController', value).subscribe(res => {
        console.log(res);
      });
    } else {
      this.errorMsg = 'All Fields are required'
    }
  }
}
