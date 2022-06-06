import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";
import {TemplateModel} from "../../../models/templates/template.model";
import {UserModel} from "../../../models/users/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


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

  constructor(private _formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this.instanceFormGroup=this._formBuilder.group({
      instanceName:["",[Validators.required]],
      instanceTemplate:["",[Validators.required]],
      instanceKeyPair:["",[Validators.required]],
    });
  }
  submitBtn()
  {

  }

}
