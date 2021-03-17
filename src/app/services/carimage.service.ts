import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl = "https://localhost:44335/api/";

  constructor(private httpClient:HttpClient) { }

  getCarImage(carId: number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getimagescar?Id="+carId;
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }
}
