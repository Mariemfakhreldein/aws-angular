import {EventEmitter, Injectable} from '@angular/core';
import { Observable} from "rxjs";
import {LoginModel} from "../models/login.view.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>() ;
  jwtObject:any;
  headers:any;
  jwt:any;

  constructor(private _http: HttpClient) { }


  authenticate(loginModel: LoginModel) {
   this.validateUser(loginModel).subscribe(
     next =>{
        this.jwtObject = next;
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
     },
     error =>{
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
     }
   )
  }

  validateUser (loginModel: LoginModel):Observable<Response>{
    console.log(loginModel);
    return this._http.post<Response>("http://localhost:4545/api/login", loginModel);

  }


  getPrivileges():Array<String>{
    let privileges = new Array<String>();
    if(this.jwtObject == null)
        return privileges;

    const encodedPayload = this.jwtObject['jwt'];
    this.jwt = encodedPayload;
    localStorage.setItem('token', JSON.stringify(encodedPayload));
    let payload = encodedPayload.split(".")[1];
    let decoded = atob(payload);
    return JSON.parse(decoded).privileges;
  }

}
