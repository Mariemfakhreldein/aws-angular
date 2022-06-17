import { Component, OnInit } from '@angular/core';
import {TemplateResponseModel} from "../../../models/templates/template.response.model";
import {TemplateService} from "../../../services/template.service";
import {UserModel} from "../../../models/users/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-assign-template',
  templateUrl: './assign-template.component.html',
  styleUrls: ['./assign-template.component.css']
})
export class AssignTemplateComponent implements OnInit {

  templates: TemplateResponseModel[] = [];
  instructors: UserModel[] = [];
  templateId: number;
  constructor(private templateService: TemplateService, private userService: UserService) { }

  ngOnInit(): void {
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
    this.userService.getAllUsers().subscribe(
      (response:any)=>{
        console.log(response.userResponsesList)
        this.instructors = response.userResponsesList;
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
