import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "../../../services/template.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {TemplateModel} from "../../../models/templates/template.model";
import {BranchService} from "../../../services/branch.service";
import {BranchModel} from "../../../models/branch/branch.model";
import {BranchPostModel} from "../../../models/branch/branch.post.model";

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.css']
})
export class CreateBranchComponent implements OnInit {

  BranchFormGroup: FormGroup = new FormGroup({});
  branch = new BranchPostModel();
  isSuccess=false;
  isLoading=true;
  currentItem='branch';
  isBranchEmpty=false;
  action='created';

  constructor(private _formBuilder:FormBuilder,
              private branchService: BranchService,
  ) { }

  ngOnInit(): void {
    this.BranchFormGroup=this._formBuilder.group({
      name:["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      value:[true,[Validators.required]],
      address:["",[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
    //this.getTrainingManager();
  }

  // getTrainingManager(){
  //   this.trainingManagers = this.branchService.getAllTrainingManager();
  // }


  submitBtn() {
    this.isBranchEmpty=false;
    let txt = JSON.stringify(this.BranchFormGroup.value);
    let templateModel = JSON.parse(txt);

      // alert("Done: \n" + "Name: " + templateModel.name
      //   + "\naddress: " + templateModel.address
      //   + "\nstatus: " + templateModel.value);

    this.branch.name = templateModel.name;
    this.branch.address = templateModel.address;
    this.branch.branchStatus = templateModel.value;

    this.postBranch(this.branch);


  }

  postBranch(model:BranchPostModel){
    this.branchService.create(model).subscribe(
      (response:any)=>{
        this.isLoading=false;
        this.isSuccess=true;
      },(error:any)=>{
        this.isLoading=false;
        this.isSuccess=false;
      }
    )
  }

  getIsSuccess(): boolean{
      return this.isSuccess;
    }

  // isTrainingProgramsChecked(){
  //   this.isChecked = [];
  //   this.isChecked.push(true);
  //   for(let i=1; i<this.trainingPrograms.length;i++){
  //       this.isChecked.push(false);
  //   }
  // }
  //
  // private fetchSelectedItems() {
  //   this.selectedItemsList=[];
  //   for (let i=0 ; i<this.isChecked.length ; i++){
  //     if(this.isChecked[i] == true){
  //       this.selectedItemsList.push(this.trainingPrograms[i]);
  //     }
  //   }
  //   return this.selectedItemsList;
  // }

}
