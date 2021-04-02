import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {
  
  apiUrl = 'https://localhost:44335/api/findeks/';

  constructor(private httpClient: HttpClient) {}

  query(carId: number,customerId:number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiUrl + 'query?carId=' + carId + '&customerId=' + customerId);
  }
}
