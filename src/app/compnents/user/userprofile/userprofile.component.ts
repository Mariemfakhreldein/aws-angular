import {Component, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/users/user.model";
import {PasswordModel} from "../../../models/password/password.model";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user:UserModel=new UserModel();
  password:PasswordModel=new PasswordModel();
  newPassword: any;
  oldPassword: any;

  isLoading: boolean = true;
  @Output() isSuccess = false;
  currentItem: string = "Password";
  errorItem: any;


  constructor(private authService:AuthService,private userService:UserService,private formBuilder: FormBuilder,) { }

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

  updatePassword() {
    this.password.oldPassword=this.oldPassword;
    this.password.newPassword=this.newPassword;
    this.userService.updatePassword(this.password).subscribe(
      (response:any)=>{
        this.isLoading = false;
        this.isSuccess = true;
      },
      (error: any)=>{
        console.log(error.status);
        if(error.status==200){
          this.isLoading = false;
          this.isSuccess = true;
        }else if(error.status ==406){
          this.isLoading = false;
          this.isSuccess = false;
          this.errorItem="Wrong old Password"
        }
        else{
          this.errorItem="Faild"
        }
      }
    )

  }
}
