import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Customer } from './customer.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  selectedUser: Customer = {
    client_name: '',
    username: '',
    product_name: '',
    password: '',
    time: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  private serviceUrl = 'http://localhost:3000/api/createlogin';



  constructor(private http: HttpClient) { }


  getTest(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.serviceUrl);
  }

  // postUser(cusotmer: Customer) {
  //   // console.log("role",cusotmer);
  //   return this.http.post(environment.apiBaseUrl + '/createlogin', cusotmer, this.noAuthHeader);


  // }

  

  postUser(cusotmer){

      return this.http.post(environment.apiBaseUrl+'/createlogin',cusotmer,this.noAuthHeader);
}
}