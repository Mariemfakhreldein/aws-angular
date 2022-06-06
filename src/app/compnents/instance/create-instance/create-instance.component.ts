import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";
import {TemplateModel} from "../../../models/templates/template.model";
import {UserModel} from "../../../models/users/user.model";
import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.component.html',
  styleUrls: ['./create-instance.component.css']
})
export class CreateInstanceComponent implements OnInit {

  students: UserModel[] = [];
  templates: TemplateModel[] = [];

  constructor(private userService: UserService,
              private templateService: TemplateService) {
  }

  ngOnInit(): void {

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
