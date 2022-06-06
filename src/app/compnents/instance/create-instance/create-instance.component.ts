import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";
import {TemplateModel} from "../../../models/templates/template.model";
import {UserModel} from "../../../models/users/user.model";

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.component.html',
  styleUrls: ['./create-instance.component.css']
})
export class CreateInstanceComponent implements OnInit {

  students: UserModel[] = [];
  templates: TemplateModel[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }
  submitBtn()
  {

  }

}
