import { Component, OnInit } from '@angular/core';
import {RoleModel} from "../../../models/roles/role.model";
import {IntakeModel} from "../../../models/intake/intake.model";
import {IntakeService} from "../../../services/intake.service";
import {RolesService} from "../../../services/roles.service";

@Component({
  selector: 'app-show-all-roles',
  templateUrl: './show-all-roles.component.html',
  styleUrls: ['./show-all-roles.component.css']
})
export class ShowAllRolesComponent implements OnInit {
  page: number=1;
  allRoles:RoleModel[]=[];
  searchValue: any;
  constructor(private roleService: RolesService,) { }

  ngOnInit(): void {

    this.getAllRoles();
  }

  getAllRoles(){
    this.roleService.getAll().subscribe(
      {
        next: (data: any) => {
          data.roles.forEach(e => {
              this.allRoles.push(e);

            }
          )
        }
      }
    );
  }

  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }

}
