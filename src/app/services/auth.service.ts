import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LoginModel} from "../models/users/login.view.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>() ;
  jwtObject:any;
  headers:any;
  jwt:any;


  constructor(private http: HttpClient, private api: ApiService, private tokenService: TokenService) {
  }

  authenticate(loginModel: LoginModel) {
    this.validateUser(loginModel).subscribe(
      next => {
        this.jwtObject = next;
        this.isAuthenticated = true;
        const encodedPayload = this.jwtObject['jwt'];
        this.jwt = encodedPayload;
        localStorage.setItem('token', JSON.stringify(encodedPayload));

        this.authenticationResultEvent.emit(true);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    )
  }

  validateUser(loginModel: LoginModel): Observable<Response> {
    console.log(loginModel);
    return this.http.post<Response>("http://localhost:4545/api/login", loginModel);

  }


  getPrivileges(): Array<String> {
    let privileges = new Array<String>();
    if (this.jwtObject == null)
      return privileges;
    const encodedPayload = this.jwtObject['jwt'];
    let payload = encodedPayload.split(".")[1];
    let decoded = atob(payload);
    return JSON.parse(decoded).privileges;
  }



}
