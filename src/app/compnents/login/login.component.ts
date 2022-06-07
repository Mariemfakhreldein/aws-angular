import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {LoginModel} from "../../models/users/login.view.model"; // import router from angular router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string="";
  password:string="";
  validUser=false;

  constructor(private route:Router,
              private authService: AuthService,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

  }

  login(){
    let loginModel = new LoginModel();
    loginModel.username = this.username;
    loginModel.password = this.password;

    this.authService.login(loginModel).subscribe(
      (response:any)=>{
        console.log(response.jwt);
        this.authService.setToken(response.jwt);
        this.authService.changeLoggedStatus(true);
        this.route.navigateByUrl("/home");
      },
      (error:any)=>{
        console.log("fail");
        console.log(error);
      }
    )
  }

}
