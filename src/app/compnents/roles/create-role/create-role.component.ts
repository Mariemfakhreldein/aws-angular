import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrivilegeModel} from "../../../models/privileges/privilege.model";
import {RoleModel} from "../../../models/roles/role.model";
import {IntakeService} from "../../../services/intake.service";
import {RolesService} from "../../../services/roles.service";
import {PrivilegesService} from "../../../services/privileges.service";
import {InstanceCreateModel} from "../../../models/instances/instance.create.model";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {


  isLoading: boolean = true;
  @Output() isSuccess = false;
  currentItem: string = "Role";
  errorItem: string = "Role name  is exist ";
  action: any;

  myGroup: FormGroup = new FormGroup({});
  privileges: PrivilegeModel[] = [];
  isChecked: any[] = [];
  selectedItemsList: any[] = [];
  isPrivilegesEmpty: any;


  constructor(private formBuilder: FormBuilder,
              private roleService: RolesService,
              private privilegeService: PrivilegesService,
  ) {
  }

  ngOnInit(): void {
    this.myGroup = this.formBuilder.group({
      roleName: ["", [Validators.required]]
    });
    this.showAllPrivileges();
  }

  showAllPrivileges() {
    this.privilegeService.getAll().subscribe(
      {
        next: (data: any) => {
          data.privileges.forEach(e => {
              this.privileges.push(e);
              console.log("********" + this.privileges)
            }
          )
        }


      }
    );

  }

  isPrivilegeChecked() {
    this.isChecked = [];
    for (let i = 0; i < this.privileges.length; i++) {
      if (this.selectedItemsList[i].name === this.privileges[i].name) {
        this.isChecked.push(true);
      } else {
        this.isChecked.push(false);
      }
    }
  }

  private fetchSelectedItems() {
    this.selectedItemsList = [];
    for (let i = 0; i < this.isChecked.length; i++) {
      if (this.isChecked[i] == true) {
        this.selectedItemsList.push(this.privileges[i]);
      }
    }
    return this.selectedItemsList;


  }

  submitBtn(roleName) {
    if (this.fetchSelectedItems().length == 0) {
      this.isPrivilegesEmpty = true;
    } else {
      this.isPrivilegesEmpty = false;
      let myList = this.fetchSelectedItems();
      let privilegeIdList: number[] = [];
      for (let i = 0; i < myList.length; i++) {
        privilegeIdList.push(myList[i].id);
      }

      let roleModel = new RoleModel(roleName, privilegeIdList);
      this.roleService.createRole(roleModel).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.isSuccess = true;
        }, (error: any) => {
          this.isLoading = false;
          this.isSuccess = false;
        }
      )

    }
  }

  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }
}
