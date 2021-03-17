import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44335/api/";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<listResponseModel<Customer>>{
    let newPath = this.apiUrl+"customers/getall";
    return this.httpClient.get<listResponseModel<Customer>>(newPath);
  }
}
