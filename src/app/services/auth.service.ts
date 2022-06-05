import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LoginModel} from "../models/login.view.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements OnInit {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>() ;
  jwtObject:any;
  headers:any;
  jwt:any;

  logged = new BehaviorSubject<boolean>(this.islogged());

  constructor(private http: HttpClient, private api: ApiService, private tokenService: TokenService) {
  }

  ngOnInit() {
    console.log("auth service initialized")
  }

  login(model: LoginModel) {
    return this.api.post("/api/login", model);
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
  }

  getToken(): string {
    return this.tokenService.getToken();
  }

  islogged(): boolean {
    let token = this.tokenService.getToken();
    return token != null;
  }

  changeLoggedStatus(status: boolean): void {
    this.logged.next(status);
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
