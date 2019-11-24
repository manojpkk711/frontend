import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {FormControl} from "@angular/forms"

import { UserService } from '../shared/user.service'
import { User } from 'src/app/shared/user.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']  
})
export class SignUpComponent implements OnInit {
  selectControl:FormControl = new FormControl()
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  myGroup: FormGroup;

   constructor(private userService: UserService, private _router: Router,
  private httpservice: HttpClient, private formBuilder: FormBuilder) { }
  
  Full: any;
  ngOnInit() {
    this.getFullname();
   
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 8000);
        this.resetForm(form);
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

  

  getFullname() {
    this.httpservice.get('http://localhost:3000/api/getRegisterData').subscribe(user => {
      this.Full = user;
      console.log("Hello user", this.Full);
    })
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      role:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
  
  Goback(){
    this._router.navigate(['/createproduct']);
  }

  roles(){
    this._router.navigate(['/assignproduct']);
  }

  login(){
    // console.log("user",User);
  }

  delete(policy) {

    if(confirm("Are you sure to delete "+ User.name)) {
    const payload = {
      _id: policy._id
    }
    this.httpservice.post('http://localhost:3000/api/deletesignup', payload).subscribe(res => {
      console.log(res, 'delete result');
      window.location.reload();
    })
  }
  }

  refresh(): void {
    // console.log("Hello user")
    // this._router.navigateByUrl('/signup', {skipLocationChange: true}).then(()=>
    // this._router.navigate(["/signup"])); 

     window.location.reload();
  }
} 
