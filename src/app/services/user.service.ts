import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44335/api/users/";

  constructor(private httpClient:HttpClient) { }

  update(user:registerModel,userId:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update?userId="+userId,user);
  }
  
  getById(userId:number):Observable<SingleResponseModel<registerModel>>{
    return this.httpClient.get<SingleResponseModel<registerModel>>(this.apiUrl+"getbyid?userId="+userId);
  }
}
