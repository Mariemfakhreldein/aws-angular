import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrivilegeModel} from "../../../models/privileges/privilege.model";
import {RoleModel} from "../../../models/roles/role.model";
import {RolesService} from "../../../services/roles.service";
import {PrivilegesService} from "../../../services/privileges.service";


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {


  isLoading: boolean = true;
  @Output() isSuccess = false;
  successMessage = 'role is created successfully';
  failMessage = 'role is already exist'

  myGroup: FormGroup = new FormGroup({});
  privileges: PrivilegeModel[] = [];
  isChecked: any[] = [];
  selectedItemsList: any[] = [];
  isPrivilegesEmpty: any;


  constructor(private formBuilder: FormBuilder,
              private roleService: RolesService,
              private privilegeService: PrivilegesService,) {}

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
      this.roleService.create(roleModel).subscribe(
        (response: any) => {
          this.emptyFields();
          this.changeSuccessAndLoading(false, true);
        }, (error: any) => {
          this.emptyFields();
          this.changeSuccessAndLoading(false, false);
        }
      )
    }
  }

  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  emptyFields(){
    this.isChecked = [];
    this.selectedItemsList = [];
    this.myGroup.reset();
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }

}
