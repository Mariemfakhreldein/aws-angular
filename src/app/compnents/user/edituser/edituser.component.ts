import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubnetModel} from "../../../models/templates/subnet.model";
import {SecurityGroupsModel} from "../../../models/templates/securityGroups.model";
import {InstanceTypeModel} from "../../../models/templates/instanceType.model";
import {TemplateResponseModel} from "../../../models/templates/templateResponse.model";
import {TemplateModel} from "../../../models/templates/template.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "../../../services/template.service";
import {AmiModel} from "../../../models/templates/ami.model";
import {UserRolesModel} from "../../../models/users/user.roles.model";
import {UserService} from "../../../services/user.service";
import {UserTracksModel} from "../../../models/users/user.tracks.model";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  isLoading:boolean=true;

  editUserFormGroup: FormGroup = new FormGroup({});
  submitted: boolean=false;

  roles:UserRolesModel[];
  tracks:UserTracksModel[];

  model = new TemplateModel();

  private selectedItemsList: any[]=[] ;
  isChecked: any[]=[];

  isSecurityGroupsSelected=true;



  @Output() isSuccess=false;

  currentItem='template';

  action='created';
  constructor(private _formBuilder:FormBuilder,
              private route:Router,
              private userService: UserService,
              private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editUserFormGroup=this._formBuilder.group({
      name:["hafsa",[Validators.required]],
      email:["student@gmail.com",[Validators.required]],
      role:["",[Validators.required]],
    });
    // alert("here");
    this.getRoles("1");
    this.getTracks("1");
  }

  getRoles(id:String){
    this.roles.push(new UserRolesModel(1, "hafsa1"));
    this.roles.push(new UserRolesModel(2, "hafsa2"));
    this.roles.push(new UserRolesModel(3, "hafsa3"));
    this.roles.push(new UserRolesModel(4, "hafsa4"));
    this.roles.push(new UserRolesModel(5, "hafsa5"));
    // this.roles = this.userService.getStudentRoles();
    alert("here " + this.roles);
    //   .getSubnet().subscribe(
    //   (response:any)=>{
    //     console.log(response);
    //     this.subnets = response.subnetList;
    //   },(error:any)=>{
    //     console.log("fail Hello", error);
    //   }
    // )

  }

  getTracks(id:string){
      this.tracks = this.userService.getStudentTracks();
      //   .getAmi(amiModel).subscribe(
      //   (response:any)=>{
      //     this.amiFlag = response.success;
      //     if(this.amiFlag){
      //       this.submit();
      //     }else{
      //       alert("enter a valid ami please  ");
      //     }
      //   },(error:any)=>{
      //     console.log("fail ami", error);
      //   }
      // )
  }

  submitBtn() {
      let txt = JSON.stringify(this.editUserFormGroup.value);
      let userModel = JSON.parse(txt);

      alert(userModel);

  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }

}


