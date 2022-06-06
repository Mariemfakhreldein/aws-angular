import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";
import {TemplateModel} from "../../../models/templates/template.model";
import {UserModel} from "../../../models/users/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.component.html',
  styleUrls: ['./create-instance.component.css']
})
export class CreateInstanceComponent implements OnInit {
  // createInstance:Instance;
  instanceFormGroup: FormGroup = new FormGroup({});
  students: UserModel[] = [];
  templates: TemplateModel[] = [];

  constructor(private _formBuilder:FormBuilder , private userService: UserService,
              private templateService: TemplateService) {
  }

  ngOnInit(): void {
    this.instanceFormGroup=this._formBuilder.group({
      instanceName:["",[Validators.required]],
      instanceTemplate:["",[Validators.required]],
      instanceKeyPair:["",[Validators.required]],
    });
  }
  submitBtn() {

  }

  private getAllStudents(){
    this.userService.getAllStudents().subscribe(
      (response:any)=>{
        this.students = response.dummyObjectResponses;
      },(error:any)=>{
      }
    )
  }


  private getAllTemplates(){
    this.templateService.getAllTemplates().subscribe(
      (response:any)=>{
        this.templates = response.templateResponseList;
      },(error:any)=>{
      }
    )
  }

}
