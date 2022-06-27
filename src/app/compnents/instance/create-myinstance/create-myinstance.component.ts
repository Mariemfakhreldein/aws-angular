import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../models/users/user.model";
import {TemplateResponseModel} from "../../../models/templates/template.response.model";
import {BranchModel} from "../../../models/branch/branch.model";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {Intake} from "../../../models/instances/intake.model";
import {Track} from "../../../models/instances/track.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecurityGroupInfoModel} from "../../../models/templates/securityGroupInfo.model";
import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";
import {InstanceService} from "../../../services/instance.service";
import {BranchService} from "../../../services/branch.service";
import {AuthService} from "../../../services/auth.service";
import {InstanceCreateModel} from "../../../models/instances/instance.create.model";

@Component({
  selector: 'app-create-myinstance',
  templateUrl: './create-myinstance.component.html',
  styleUrls: ['./create-myinstance.component.css']
})
export class CreateMyinstanceComponent implements OnInit {

  students: UserModel[] = [];
  templates: TemplateResponseModel[] = [];
  templateId=0;
  isSuccess=false;
  isLoading=true;
  currentItem='instance';
  action='created';

  myGroup: FormGroup = new FormGroup({});



  isTemplatesEmpty=false;

  isChecked: any[]=[];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private templateService: TemplateService,
              private instanceService: InstanceService,
              private branchService: BranchService,
              private authService:AuthService) {
  }

  ngOnInit(): void {
    this.myGroup=this.formBuilder.group({
      instanceName:["",[Validators.required]],
      keypairName:["",[Validators.required]],
      timeToLiveInMinutes:["",[Validators.required,Validators.min(5), Validators.pattern("^[0-9]*$"),Validators.max(3500)]],
    });

    this.getAllTemplates();
  }
  submitBtn(instanceName: string, keyPairName: string, timeToLiveInMinutes:number) {
      let studentIds :number[]=[];
      studentIds.push(this.authService.getUserId());
      let instanceModel = new InstanceCreateModel(instanceName, keyPairName, studentIds, this.templateId, timeToLiveInMinutes);
      this.instanceService.createInstance(instanceModel).subscribe(
        (response:any)=>{
          this.isLoading=false;
          this.isSuccess=true;
        }, (error: any)=>{
          this.isLoading=false;
          this.isSuccess=false;
        }
      )
    }

  getAllTemplates(){
    let i=0;
    this.templateService.getAllTemplates().subscribe(
      (response:any)=> {
        this.templates = response.templateResponseList;
      },(error:any)=>{
        console.log(error);
      }
    )
  }

  changeTemplateId(event: any){
    this.templateId = event.target.value;
    console.log(event.target.value);
  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }

}
