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

  isEmptyTemplates=false;
  isEmptyInstructors=false;

  selectedTemplates: TemplateResponseModel[]= [] ;
  selectedInstructors: UserModel[] = [];
  isCheckedInstructor: any[]=[] ;
  isCheckedTemplates: any[]=[] ;


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
    // this.getAllInstructors();
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
      let myTemplatesList=this.fetchSelectedTemplates();
      // let myInstructorList =this.fetchSelectedInstructors()
      if(myTemplatesList.length==0)
      {
        this.isEmptyTemplates=true;

      }else{
        this.isEmptyTemplates=false;

        console.log("templateeeeeeees"+myTemplatesList[0].ami.imageName);
        console.log("templateeeeeeees2"+myTemplatesList[0].ami.architecture);
        console.log("templateeeeeeees3"+myTemplatesList[0].instanceType);

      }
      // console.log("instructorss"+myInstructorList[0].id);
      // console.log("2222222"+this.isCheckedTemplates[0]);



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


  //
  // changeTemplateId(event: any){
  //   this.templateId = event.target.value;
  //   console.log(event.target.value);
  // }


