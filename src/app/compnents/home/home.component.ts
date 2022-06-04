import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  branches = false;
  templates = false;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    if(this.authService.getPrivileges().includes("WRITE") ){
      this.branches = true;
    }else if(this.authService.getPrivileges().includes("READ") ){
      this.templates = true;
    }
  }

  onAdminClick(){
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.jwt)

    console.log(headers);
    this.http.get<Response>("http://localhost:4545/api/admin", {headers:headers}).subscribe(
      (response)=>{
        console.log("success Admin", response);
      },(error)=>{
        console.log("fail Admin", error);
      }
    )
  }

  onUsersClick(){
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.jwt)

    console.log(headers);
    this.http.get<Response>("http://localhost:4545/api/users", {headers:headers}).subscribe(
      (response)=>{
        console.log("success Users", response);
      },(error)=>{
        console.log("fail Users", error);
      }
    )
  }

  onHelloClick(){
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.jwt)

    console.log(headers);
    this.http.get<Response>("http://localhost:4545/api/hello", {headers:headers}).subscribe(
      (response)=>{
        console.log("success Hello", response);
      },(error)=>{
        console.log("fail Hello", error);
      }
    )
  }

}
