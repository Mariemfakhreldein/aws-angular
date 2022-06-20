import { Component, OnInit } from '@angular/core';
import {TemplateResponseModel} from "../../../models/templates/template.response.model";
import {TemplateService} from "../../../services/template.service";
import {UserModel} from "../../../models/users/user.model";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubnetModel} from "../../../models/templates/subnet.model";
import {SecurityGroupsModel} from "../../../models/templates/securityGroups.model";
import {InstanceTypeModel} from "../../../models/templates/instanceType.model";
import {TemplateModel} from "../../../models/templates/template.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AmiModel} from "../../../models/templates/ami.model";

@Component({
  selector: 'app-assign-template',
  templateUrl: './assign-template.component.html',
  styleUrls: ['./assign-template.component.css']
})
export class AssignTemplateComponent implements OnInit {

  assignTemplateFormGroup: FormGroup = new FormGroup({});
  submitted: boolean=false;
  templates: TemplateResponseModel[] = [];
  instructors: UserModel[] = [];

  isTemplatesSelected = true;
  isInstructorsSelected = true;

  selectedTemplates: any[] = [] ;
  private selectedInstructors: any[] = [];

  constructor(private formBuilder:FormBuilder,
              private route:Router,
              private templateService: TemplateService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.assignTemplateFormGroup = this.formBuilder.group({
      templates: ["", [Validators.required]],
      instructors: ["", [Validators.required]],
    });

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

  private getAllInstructors(){
    this.userService.getAllUsers().subscribe(
      (response:any)=>{
        console.log(response.userResponsesList)
        this.instructors = response.userResponsesList;
      },(error:any)=>{
        console.log(error);
      }
    )
  }

    submitBtn() {
      if(this.selectedTemplates.length === 0 ){
        this.isTemplatesSelected = false;
      }
      else {
        if(this.selectedInstructors.length == 0 ) {
          this.isInstructorsSelected = false
        }else {

        }
      }
    }
  }


  //
  // changeTemplateId(event: any){
  //   this.templateId = event.target.value;
  //   console.log(event.target.value);
  // }


