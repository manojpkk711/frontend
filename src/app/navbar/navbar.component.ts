import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userDetails;
   constructor(private userService: UserService, private _router:Router) { }
  
  ngOnInit() {
  }
  

  login(){
    this._router.navigate(['/login']);
  }

}
