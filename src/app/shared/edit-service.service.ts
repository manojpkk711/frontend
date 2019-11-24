import { Injectable } from '@angular/core';
import { Edit } from './edit-service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EditServiceService {

  selectedUser: Edit = {

    product_name: '',
    link: '',
    users: []

  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  private serviceUrl = 'http://localhost:3000/api/productListController';

  constructor(private http: HttpClient) { }


  getTest(): Observable<Edit[]> {
    return this.http.get<Edit[]>(this.serviceUrl);
  }

  // postUser(edit: Edit) {
  //   // console.log("role",edit);
  //   return this.http.post(environment.apiBaseUrl + '/productListController', edit, this.noAuthHeader);
  // }

  postUser(edit: Edit) {

    const product = this.selectedUser.product_name;
    const link = this.selectedUser.link;
    const userss = this.selectedUser.users

    if ((product && link) || (userss)) {

      return this.http.post(environment.apiBaseUrl + '/productListController', edit, this.noAuthHeader);
    }
  }
}
  