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

  }

}
