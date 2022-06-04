import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  admin = false;
  hello = false;

  adminMessage :string;
  usersMessage :string;
  helloMessage :string;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    if(this.authService.getPrivileges().includes("WRITE") ){
      this.admin = true;
    }else if(this.authService.getPrivileges().includes("READ") ){
      this.hello = true;
    }
  }

  onAdminClick(){
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.jwt)

    console.log(headers);
    this.http.get<Response>("http://localhost:4545/api/admin", {headers:headers}).subscribe(
      (response)=>{
        this.adminMessage =" welcome admin";
        this.usersMessage ="";
        this.helloMessage ="";
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
        this.usersMessage =" welcome users";
        this.adminMessage ="";
        this.helloMessage ="";
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
        this.helloMessage =" welcome hello";
        this.adminMessage ="";
        this.usersMessage ="";

        console.log("success Hello", response);
      },(error)=>{
        console.log("fail Hello", error);
      }
    )
  }

}
