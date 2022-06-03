import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string="";
  password:string="";
  validUser=false;

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  loginUser()
  {

    if (this.email=="abdokhattab@gmail.com" && this.password=="admin1234")
    {
      this.route.navigate(['/home']);
      console.log("welcome");
    }
    else{
      this.validUser=true;
    }
  }


}
