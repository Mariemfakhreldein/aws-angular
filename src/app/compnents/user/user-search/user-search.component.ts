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
    this.getAllUsers();
  }
  //track ,role
  page: number=1;

  getAllUsers() {
    this.userService.getAllUserType().subscribe(
      {
        next: (data: any) => {
          console.log("****************"+data.userResponsesList);
          data.userResponsesList.forEach(e => {
              this.usersList.push(e);
            }
          )
        }
      }
    );


  }

  public getTracksAsString(userTracks: any): string{
    let tracksAsString = "";
    for(let i=0; i<userTracks.length; i++){
      tracksAsString += userTracks[i].trackName + ', ';
    }
    return tracksAsString;
  }



}
