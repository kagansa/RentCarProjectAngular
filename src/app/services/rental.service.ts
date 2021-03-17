import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44335/api/";
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetails():Observable<listResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getalldetails";
    return this.httpClient.get<listResponseModel<Rental>>(newPath);
  }
  
}
