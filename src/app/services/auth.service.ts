import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../models/loginModel';
import { registerModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44335/api/auth/";
  
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService
  ) { }

  name: string = "";
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId: number;

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(loginModel:registerModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",loginModel)
  }

  isAuthenticated(): boolean{
    return this.localStorageService.checkExistsOrNot("token");
  }

  userDetailFromToken() {
    this.token = this.localStorageService.get("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  roleCheck(roleList: string[]) {
    if (this.roles !== undefined) {
      roleList.forEach(role => {
        if (this.roles.includes(role)) {
          return true;
        } else {
          return false;
        }
      })
      return true;
    } else {
      return false;
    }
  }

  logout(){
    this.localStorageService.clean();
    this.onRefresh();
    this.router.navigateByUrl('/araclar');
    this.toastrService.info("Çıkış Yapıldı");
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
}
