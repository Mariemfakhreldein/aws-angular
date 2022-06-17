import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LoginModel} from "../models/users/login.view.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements OnInit {

  logged = new BehaviorSubject<boolean>(this.isLogin());
  constructor(private http: HttpClient, private api: ApiService, private tokenService: TokenService) {
  }

  ngOnInit() {
    console.log("auth service initialized")
  }

  login(model: LoginModel) {
    return this.http.post(`${environment.baseURL}/api/login`,model);
  }

  logout(){
    this.tokenService.removeToken();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
  }

  getToken(): string {
    return this.tokenService.getToken();
  }

  isLogin(): boolean {
    let token = this.tokenService.getToken();
    return token != null;
  }

  changeLoggedStatus(status: boolean): void {
    this.logged.next(status);
  }

  getPrivileges():string[]{
    const jwtToken = this.tokenService.getToken();
    const encodedPayLoad = jwtToken.split(".")[1];
    const payLoad = atob(encodedPayLoad);
    return JSON.parse(payLoad).privileges;
  }

}
