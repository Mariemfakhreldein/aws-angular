import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient, private tokenService:TokenService) { }

  getHeaders():HttpHeaders{
    return new HttpHeaders({
      Authorization : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VzIjpbIlJFQUQiXSwiaWQiOiJkdW1iIGlkIiwic3ViIjoiYXNocmYiLCJpYXQiOjE2NTQyODM3NTMsImV4cCI6MTY1NDQ1NjU1M30.WxthxT6G87_UF8Hmn61F2TeMaCsqXDBehHZnER2M1AU"
    });
  }

  get(url:string){
    return this.http.get(`${environment.baseURL}${url}`,{headers:this.getHeaders()});
  }

  post(url:string, body:any){
    return this.http.post(`${environment.baseURL}${url}`,body, {headers:this.getHeaders()});
  }

  update(url:string, body:any){
    return this.http.put(`${environment.baseURL}${url}`,body, {headers:this.getHeaders()});

  }

  delete(url:string,id:string){
    return this.http.delete(`${environment.baseURL}${url}${id}`, {headers:this.getHeaders()});
  }

}
