import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44335/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getdetailall";
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarGetById(carId: number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getdetailbyid?carId="+carId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdetailbrandid?brandId=" + brandId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdetailcolorid?colorId=" + colorId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }
}
