import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44335/api/";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<listResponseModel<Color>>{
    let newPath = this.apiUrl+"colors/getall";
    return this.httpClient.get<listResponseModel<Color>>(newPath);
  }
}
