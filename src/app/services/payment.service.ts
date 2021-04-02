import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { creditCard } from '../models/creditCard';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44335/api/creditcards/';
  constructor(private httpClient: HttpClient) {}

  payment(card: creditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'payment', card);
  }

  add(card: creditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', card);
  }

  getCardByUserId(userId:number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiUrl + 'getbyid?userId='+userId);
  }  

  getAllCustomerId(customerId:number): Observable<listResponseModel<creditCard>> {
    return this.httpClient.get<listResponseModel<creditCard>>(this.apiUrl + 'getallbyid?customerId='+customerId);
  }

 
}