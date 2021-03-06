import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/users/user.model";
import {PasswordModel} from "../../../models/password/password.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: UserModel = new UserModel();
  password: PasswordModel = new PasswordModel();

  newPassword: string = '';
  oldPassword: string = '';
  confirmPassword: string = '';


  isContainLowerCase = false;
  isContainUpperCase = false;
  isContainNumber = false;
  isContainsSpecialChar = false;
  isLengthlessThan8 = false;


  isLoading: boolean = true;
  @Output() isSuccess = false;
  currentItem: string = "Password updated successfully";
  errorItem: any;
  isEqual: boolean;

  // myGroup: FormGroup = new FormGroup({});


  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {

    // this.myGroup=this.formBuilder.group({
    //   oldPassword:['',[Validators.required]],
    //   newPassword:['',[Validators.required,]],
    //   confirmPassword:['',[Validators.required]]
    // });

    this.userService.getUserById().subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user)
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  updatePassword() {
    //   this.password.oldPassword=this.oldPassword;
    //   this.password.newPassword=this.newPassword;
    //   this.userService.updatePassword(this.password).subscribe(
    //     (response:any)=>{
    //       this.isLoading = false;
    //       this.isSuccess = true;
    //     },
    //     (error: any)=>{
    //       console.log(error.status);
    //       if(error.status==200){
    //         this.isLoading = false;
    //         this.isSuccess = true;
    //         this.oldPassword ='';
    //         this.newPassword='';
    //         this.confirmPassword='';
    //       }else if(error.status ==406){
    //         this.isLoading = false;
    //         this.isSuccess = false;
    //         this.errorItem="Wrong old Password"
    //         this.oldPassword ='';
    //         this.newPassword='';
    //         this.confirmPassword='';
    //       }
    //       else{
    //         this.errorItem="Faild"
    //       }
    //     }
    //   )
    //
  }

  @ViewChild('newPassword') newPasswordInput;
  @ViewChild('confirmPassword') confirmPasswordInput;

  checkPassword() {
    if (this.newPassword == this.confirmPassword) {
      this.isEqual = true;
    } else {
      this.isEqual = false;
    }
  }

  validationpassword(value: string) {
    this.isContainLowerCase = false;
    this.isContainUpperCase = false;
    this.isContainNumber = false;
    this.isContainsSpecialChar = false;
    this.isLengthlessThan8 = false;
    if (!value.match("(.*[a-z].*)")) {
      this.isContainLowerCase = true;
    }
    if (!value.match("(.*[A-Z].*)")) {
      this.isContainUpperCase = true;
    }
    if (!value.match("(.*\\d.*)")) {
      this.isContainNumber = true;
    }
    if (!value.match("!|@|#|" + e("[") + "|"+ e("]") + "|" + e(".") + "|"+ e("+") + "|"+ e("=") + "|"+ e("/") + "|"+ e("_") + "|"+ e("-") + "|"+ e("*") + "|"  + e("{") + "|" + e("%") + "|" + e(".") + "|" + e("^") + "|=|" + e("\\"))) {
      this.isContainsSpecialChar = true;
    }
    if (value.length <= 8) {
      this.isLengthlessThan8 = true;
    }

  }
}

function e(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
