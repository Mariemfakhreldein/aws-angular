import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/users/user.model";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  searchValue: string;
  usersList: UserModel[] = [];
  filteredString: any = "";
  search:any='';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // this.getAllUsers();
    this.usersList.push(
      new UserModel("mariam", "mariam@gmail.com", "training manager", ["hello", "hy", "kjj"]),
      new UserModel("khattab", "khattab@gmail.com", "track supervisor", ["hello", "hy", "kjj"]),
      new UserModel("hafsa", "hafsa@gmail.com", "training manager", ["hello", "hy", "kjj"]),
      new UserModel("hend", "hend@gmail.com", "instructor", ["hello", "hy", "kjj"]),
      new UserModel("sally", "sally@gmail.com", "instructor", ["hello", "hy", "kjj"]),
      new UserModel("salma", "salma@gmail.com", "student", ["hello", "hy", "kjj"]))

  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      {
        next: (data: any) => {
          data.userResponsesList.forEach(e => {
              this.usersList.push(e);
            }
          )
        }
      }
    );


  }

  onChangeSearchText(value: string) {
  }


}
