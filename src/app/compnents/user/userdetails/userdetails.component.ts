import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../models/users/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  userList: UserModel[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userList.push(
      new UserModel("mariam", "mariam@gmail.com", "training manager"),
      new UserModel("khattab", "khattab@gmail.com", "track supervisor"),
      new UserModel("hafsa", "hafsa@gmail.com", "training manager"),
      new UserModel("hend", "hend@gmail.com", "instructor"),
      new UserModel("sally", "sally@gmail.com", "instructor"),
      new UserModel("salma", "salma@gmail.com", "student"),
    )

  }

  private getAllUsers(){
      this.userService.getAllUsers().subscribe(
        (response:any)=>{
          this.userList = response.dummyObjectResponses;
        },(error:any)=>{
        }
      )
    }

}