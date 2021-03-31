import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44335/api/colors/";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<listResponseModel<Color>>{
    let newPath = this.apiUrl+"getall";
    return this.httpClient.get<listResponseModel<Color>>(newPath);
  }

  getByIdColor(colorId:number):Observable<SingleResponseModel<Color>>{
    return this.httpClient.get<SingleResponseModel<Color>>(this.apiUrl+"getbyid?colorId="+colorId);
  }


  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color);
  }

  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",color);
  }
  
}
