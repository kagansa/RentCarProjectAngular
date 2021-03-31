import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44335/api/cars/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<listResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "getdetailall";
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }

  getCarGetById(carId: number):Observable<listResponseModel<CarDetail>>{
  let newPath = this.apiUrl + "getdetailbyid?carId="+carId;
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<listResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "getdetailbrandid?brandId=" + brandId;
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<listResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "getdetailcolorid?colorId=" + colorId;
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }

  getCarsBrandAndColor(brandId:number,colorId:number): Observable<listResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "GetCarFilterBrandIdColorId?brandId=" + brandId+"&colorId="+colorId;
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }

  add(product:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",product);
  }

  update(product:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",product);
  }

  //Update Get Car
   getCarById(carId: number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "getbyid?carId="+carId;
      return this.httpClient.get<SingleResponseModel<Car>>(newPath);
    }
}
