import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key : string){
    return this.localStorage.getItem(key);
  }

  add(key: string, value: string){
    this.localStorage.setItem(key,value);
  }

  remove(key: string){
    this.localStorage.removeItem(key);
  }

  clean(){
    this.localStorage.clear();
  }

  checkExistsOrNot(value: string): boolean{
    if (localStorage.getItem(value) !== null && localStorage.getItem(value) !== undefined) {
      return true;
    }
    return false;
  }
}
