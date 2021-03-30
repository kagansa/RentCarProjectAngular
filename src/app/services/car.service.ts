import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44335/api/cars/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "getdetailall";
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarGetById(carId: number):Observable<listResponseModel<Car>>{
  let newPath = this.apiUrl + "getdetailbyid?carId="+carId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }  

 

  getCarsByBrand(brandId: number): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "getdetailbrandid?brandId=" + brandId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "getdetailcolorid?colorId=" + colorId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsBrandAndColor(brandId:number,colorId:number): Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "GetCarFilterBrandIdColorId?brandId=" + brandId+"&colorId="+colorId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }
}
