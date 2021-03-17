import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
 apiUrl = "https://localhost:44335/api/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<listResponseModel<Brand>>{
    let newPath = this.apiUrl+"brands/getall";
    return this.httpClient.get<listResponseModel<Brand>>(newPath);
  }

}

