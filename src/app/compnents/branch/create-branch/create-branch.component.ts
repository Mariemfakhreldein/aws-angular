import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "../../../services/template.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {TemplateModel} from "../../../models/templates/template.model";
import {BranchService} from "../../../services/branch.service";

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.css']
})
export class CreateBranchComponent implements OnInit {

  BranchFormGroup: FormGroup = new FormGroup({});

  trainingManagers:string[];
  trainingPrograms:string[];

  isTrainingProgramsSelected=true;
  isChecked: any[]=[];
  private selectedItemsList: any[]=[] ;

  constructor(private _formBuilder:FormBuilder,
              private branchService: BranchService,
  ) { }

  ngOnInit(): void {
    this.BranchFormGroup=this._formBuilder.group({
      name:["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      location:["",[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      trainingManager:["",[Validators.required]],
    });
    this.getTrainingManager();
  }

  getTrainingManager(){
    this.trainingManagers = this.branchService.getAllTrainingManager();
  }

  onChangeSubnet(managerId: any) {
    if (managerId != "") {
      alert(managerId);
      this.trainingPrograms = this.branchService.getAllTrainingPrograms();
      this.isTrainingProgramsChecked();
    }
  }


  submitBtn() {

    if(this.fetchSelectedItems().length === 0 ){
      this.isTrainingProgramsSelected=false;

    }else {
      let txt = JSON.stringify(this.BranchFormGroup.value);
      let templateModel = JSON.parse(txt);
      alert("Done: \n" + "Name: " + templateModel.name
        + "\nLocation: " + templateModel.location
        + "\ntraining Manager: " + templateModel.trainingManager
        + "\ntraining Programs: " + this.selectedItemsList);
    }

  }

  isTrainingProgramsChecked(){
    this.isChecked = [];
    this.isChecked.push(true);
    for(let i=1; i<this.trainingPrograms.length;i++){
        this.isChecked.push(false);
    }
  }

  private fetchSelectedItems() {
    this.selectedItemsList=[];
    for (let i=0 ; i<this.isChecked.length ; i++){
      if(this.isChecked[i] == true){
        this.selectedItemsList.push(this.trainingPrograms[i]);
      }
    }
    return this.selectedItemsList;
  }
}
