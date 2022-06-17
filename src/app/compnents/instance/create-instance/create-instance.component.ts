import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";
import {TemplateModel} from "../../../models/templates/template.model";
import {UserModel} from "../../../models/users/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";
import {TemplateResponseModel} from "../../../models/templates/template.response.model";
import {InstanceCreateModel} from "../../../models/instances/instance.create.model";
import {InstanceService} from "../../../services/instance.service";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.component.html',
  styleUrls: ['./create-instance.component.css']
})
export class CreateInstanceComponent implements OnInit {
  // createInstance:Instance;
  // instanceFormGroup: FormGroup = new FormGroup({});
  students: UserModel[] = [];
  templates: TemplateResponseModel[] = [];
  templateId: number;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private templateService: TemplateService,
              private instanceService: InstanceService) {
  }

  ngOnInit(): void {
    // this.instanceFormGroup=this.formBuilder.group({
    //   instanceName:["",[Validators.required]],
    //   instanceTemplate:["",[Validators.required]],
    //   instanceKeyPair:["",[Validators.required]],
    // });

    this.getAllStudents();
    this.getAllTemplates();
  }
  submitBtn(instanceName: string, keyPairName: string, studentId: number) {
    console.log(studentId);

    let studentIds:number[] = [studentId];

    let instanceModel = new InstanceCreateModel(instanceName, keyPairName, studentIds, this.templateId);
    this.instanceService.createInstance(instanceModel).subscribe(
      (response:any)=>{
          console.log("success instance");
      }, (error: any)=>{
        console.log(error);
        console.log("fail instance");
      }
    )
  }

  private getAllStudents(){
    this.userService.getAllStudents().subscribe(
      (response:any)=>{
        console.log(response.userResponsesList)
        this.students = response.userResponsesList;
      },(error:any)=>{
           console.log(error);
      }
    )
  }

  private getAllTemplates(){
    this.templateService.getAllTemplates().subscribe(
      (response:any)=>{
        console.log(response.templateResponseList)
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

}
