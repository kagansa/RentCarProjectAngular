import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44335/api/rentals/";
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetails():Observable<listResponseModel<Rental>>{
    let newPath = this.apiUrl + "getalldetails";
    return this.httpClient.get<listResponseModel<Rental>>(newPath);
  }
  
  getRentalCarControl(carId: number):Observable<listResponseModel<Rental>>{
    let newPath = this.apiUrl + "getcarcontrol?carId="+carId;
    return this.httpClient.get<listResponseModel<Rental>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"addrental",rental);
  }
  
  
}
