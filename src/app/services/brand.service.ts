import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
 apiUrl = "https://localhost:44335/api/brands/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<listResponseModel<Brand>>{
    return this.httpClient.get<listResponseModel<Brand>>(this.apiUrl+"getall");
  }
  getByIdBrands(brandId:number):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl+"getbyid?id="+brandId);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",brand);
  }

}

