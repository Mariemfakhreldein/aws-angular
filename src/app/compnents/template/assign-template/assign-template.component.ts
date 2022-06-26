import { Component, OnInit } from '@angular/core';
import {TemplateService} from "../../../services/template.service";
import {UserModel} from "../../../models/users/user.model";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateResponseModel} from "../../../models/templates/templateResponse.model";
import {AssignTemplateModel} from "../../../models/templates/assign.template.model";
import {AssignModel} from "../../../models/templates/assign.model";

@Component({
  selector: 'app-assign-template',
  templateUrl: './assign-template.component.html',
  styleUrls: ['./assign-template.component.css']
})
export class AssignTemplateComponent implements OnInit {

  assignTemplateFormGroup: FormGroup = new FormGroup({});
  submitted: boolean = false;
  templates: TemplateResponseModel[] = [];
  instructors: UserModel[] = [];

  isEmptyTemplates = false;
  isEmptyInstructors = false;

  selectedTemplates: TemplateResponseModel[]= [] ;
  selectedInstructors: UserModel[] = [];

  isCheckedInstructor: any[]=[] ;
  isCheckedTemplates: any[]=[] ;

  assignTemplateRequest = new AssignTemplateModel();

  constructor(private formBuilder:FormBuilder,
              private route:Router,
              private templateService: TemplateService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.assignTemplateFormGroup = this.formBuilder.group({
      templates: ["", [Validators.required]],
      instructors: ["", [Validators.required]],
    });
    this.getAllTemplates();
    this.getAllInstructors();
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
    this.userService.getAllInstructors().subscribe(
      (response:any)=>{
        console.log(response)
        this.instructors = response;
      },(error:any)=>{
        console.log(error);
      }
    )
  }

    submitBtn() {
      let myTemplatesList = this.fetchSelectedTemplates();
      let myInstructorList = this.fetchSelectedInstructors()

      if(myTemplatesList.length == 0) {this.isEmptyTemplates = true; }
      else{myTemplatesList.forEach( template => this.assignTemplateRequest.templateConfigurationIds.push(template.id));}

      if(myInstructorList.length == 0) {this.isEmptyInstructors = true; }
      else{ myInstructorList.forEach( instructor => this.assignTemplateRequest.instructorIds.push(instructor.id));
      }

      if(myInstructorList.length >0 && myTemplatesList.length > 0){
        console.log(this.assignTemplateRequest);
        this.templateService.assignTemplateToInstructors(this.assignTemplateRequest).subscribe(
          (response:any)=>{
            console.log("success");
          },
          (error: any)=>{
            console.log("fail");
            console.log(error);
          }
        )
      }

    }

    fetchSelectedInstructors() {
    this.selectedInstructors=[];
    for (let i=0 ; i<this.isCheckedInstructor.length ; i++){
      if(this.isCheckedInstructor[i] == true){
        this.selectedInstructors.push(this.instructors[i]);
      }
    }
    return this.selectedInstructors;
  }

   fetchSelectedTemplates() {
      this.selectedTemplates=[];
      for (let i=0 ; i<this.isCheckedTemplates.length ; i++){
        if(this.isCheckedTemplates[i] == true){
          this.selectedTemplates.push(this.templates[i]);
        }
      }
      return this.selectedTemplates;
    }


}
