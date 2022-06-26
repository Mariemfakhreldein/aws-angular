import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/users/user.model";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user:UserModel=new UserModel();
  constructor(private authService:AuthService,private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getUserById().subscribe(
      (response:any)=>{
        this.user = response;
        console.log(this.user)
      },(error:any)=>{
        console.log(error);
      }
    )
  }

}
