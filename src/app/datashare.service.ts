import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  data: any;

  constructor() { }
  setData(value) {
    this.data = value
  }
  //   dataValue() {
  //    this..post(this.data, 'sdfsfsdfsdfsf')
  //  }

}
