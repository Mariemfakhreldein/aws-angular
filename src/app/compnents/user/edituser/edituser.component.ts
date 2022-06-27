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
import {EditUserModel} from "../../../models/users/edit.user.model";
import {TrackModel} from "../../../models/tracks/track.model";
import {TrackService} from "../../../services/track.service";
import {RoleService} from "../../../services/role.service";
import {RoleModel} from "../../../models/roles/role.model";
import {UpdateUserModel} from "../../../models/users/update.user.model";
import {UserTrackModel} from "../../../models/users/user.track.model";
import {AllTrackModel} from "../../../models/tracks/all.track.model";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  isLoading:boolean=true;

  editUserFormGroup: FormGroup = new FormGroup({});
  submitted: boolean=false;
  id:string;

  // roles:UserRolesModel[];
  // tracks:UserTrackModel[];

  allTracks: AllTrackModel[];
  allRoles: RoleModel[];

  editUserModel = new EditUserModel();
  editUserModelUpdated = new EditUserModel();


  private selectedItemsList: any[]=[] ;
  isChecked: any[]=[];

  isTracksSelected=true;


  @Output() isSuccess=false;

  currentItem='user';

  action='edited';
  constructor(private _formBuilder:FormBuilder,
              private route:Router,
              private userService: UserService,
              private trackService: TrackService,
              private roleService: RoleService,
              private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editUserFormGroup=this._formBuilder.group({
      name:["",[Validators.required]],
      email:["",[Validators.required]],
      role:["",[Validators.required]],
    });

    this._activatedRoute.paramMap
      .subscribe(
        parms => {
          this.id = parms.get('id');
          this.getUser(this.id);
          this.getAllTracks();
          this.getAllRoles();
        }
      );
  }

  getUser(id:string){
      this.userService.getUser(id).subscribe(
      (response:any)=> {
        console.log(response);
        this.editUserModel = response;

        this.editUserFormGroup.patchValue({
          name: this.editUserModel.username,
          email: this.editUserModel.email,
          role: this.editUserModel.role
        });

      })

  }

  submitBtn() {
    if (this.fetchSelectedItems().length === 0) {
      this.isTracksSelected = false;
      this.action = ': Select tracks at first';
      this.isSuccess = false;
      this.isLoading = false;
      console.log("hereeeeaa" + this.isTracksSelected);
    } else {
      let txt = JSON.stringify(this.editUserFormGroup.value);
      let userModel = JSON.parse(txt);

      this.editUserModelUpdated.username = userModel.name;
      this.editUserModelUpdated.email = userModel.email;
      this.editUserModelUpdated.role = userModel.role;
      this.editUserModelUpdated.tracks = this.selectedItemsList;

      console.log(this.isChecked);

      // if(this.editUserModelUpdated.equals(this.editUserModel)){
      //   console.log("Non updateeeeeeeeeeeeeee");
      //   this.action = 'edited. NO Modification';
      //   this.isLoading=false;
      //   this.isSuccess=false;
      // }else{
      let userUpdatedModel = new UpdateUserModel();
      userUpdatedModel.roleName = this.editUserModelUpdated.role;
      userUpdatedModel.tracksId = this.getUserUpdatedTracks(this.editUserModelUpdated.tracks);
      userUpdatedModel.tracksId.forEach((val) => {
        console.log(val)
      })

      this.updateUser(this.id, userUpdatedModel);


      //}
    }
  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }


  isTracksListChecked(){
    this.isChecked = [];
    let isFound = false;
    for(let i=0; i<this.allTracks.length;i++){
      console.log("1 : "+ this.allTracks[i].name);
      for(let j=0; j<this.editUserModel.tracks.length; j++){
        console.log("2 : "+ this.editUserModel.tracks.length);
        console.log("2 : "+ this.allTracks[i].name);
        if (this.allTracks[i].name === this.editUserModel.tracks[j].trackName){
          isFound = true;
        }
      }
      if(isFound){
        this.isChecked.push(true);
      } else{
        this.isChecked.push(false);
      }
      isFound = false;
    }
  }

  private fetchSelectedItems() {
    this.selectedItemsList=[];
    for (let i=0 ; i<this.isChecked.length ; i++){
      if(this.isChecked[i] == true){
        let model = new UserTrackModel(this.allTracks[i].id, this.allTracks[i].name);
        this.selectedItemsList.push(model);
      }
    }
    return this.selectedItemsList;
  }

  getAllTracks(){
    this.trackService.getAll().subscribe(
      (response:any)=>{
        console.log(response);
        this.allTracks = response.trackResponsesList;
        this.isTracksListChecked();
        console.log("is checked" + this.isChecked);
      },(error:any)=>{
        console.log("fail Hello", error);
      }
    )
  }

  getAllRoles(){
    this.roleService.getAllRoles().subscribe(
      (response:any)=>{
        console.log(response.roles);
        this.allRoles = response.roles;
      },(error:any)=>{
        console.log("fail Hello", error);
      }
    )
  }

  updateUser(id:string, model:UpdateUserModel){
    this.userService.update(id, model).subscribe(
      (response:any)=>{
        console.log(response);
        this.isLoading=false;
        this.isSuccess=true;
      },(error:any)=>{

        if(error.status == 200){
          this.isSuccess = true;
        }else{
          this.action = 'edited';
          this.isSuccess = false;
        }
        this.isLoading=false;
      }
    )
  }

  getUserUpdatedTracks(userTracksModel:any):number[]{
    let trackIdModel = new  Array<number>();
    userTracksModel.forEach((val) => {trackIdModel.push(val.id)
    })
    return trackIdModel;
  }
}


