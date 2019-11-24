import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required),
    Clientname:new FormControl(null, Validators.required),
    product_Name:new FormControl(null, Validators.required),
    Time:new FormControl(null, Validators.required)
  });
  constructor(private _router:Router) { }

  ngOnInit() {
  }

  login(){
    this._router.navigate(['/login']);
  }
}
