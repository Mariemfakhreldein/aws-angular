import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {LoginModel} from "../../models/login.view.model"; // import router from angular router

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

    this.authService.authenticationResultEvent.subscribe(
      result =>{
        if(result){
          const url = this.activatedRouter.snapshot.queryParams['requested'];
          this.route.navigateByUrl("/home");
        }else{
          // this.message="wrong email or password";
        }
      }
    )
  }

  loginUser()
  {
    let loginModel = new LoginModel();
    loginModel.username = this.username;
    loginModel.password = this.password;
    this.authService.authenticate(loginModel);
  }

  // login(){
  //   let loginModel = new LoginModel();
  //   loginModel.username = this.username;
  //   loginModel.password = this.password;
  //   this.authService.login(loginModel).subscribe(
  //     (reponse)=>{
  //       this.authService.setToken(reponse.Data);
  //       this.route.navigateByUrl("/home");
  //     },
  //     (error)=>{
  //
  //     }
  //   )
  // }

}
