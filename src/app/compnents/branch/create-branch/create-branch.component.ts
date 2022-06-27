import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchService} from "../../../services/branch.service";
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

  successMessage = 'branch is created successfully';
  failMessage = ''
  isBranchEmpty=false;

  constructor(private _formBuilder:FormBuilder,
              private branchService: BranchService,
  ) { }

  ngOnInit(): void {
    this.BranchFormGroup=this._formBuilder.group({
      name:["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      address:["",[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
  }



  submitBtn() {
    this.isBranchEmpty=false;
    let txt = JSON.stringify(this.BranchFormGroup.value);
    let templateModel = JSON.parse(txt);
    this.branch.name = templateModel.name;
    this.branch.address = templateModel.address;
    this.branch.branchStatus = templateModel.value;

    this.postBranch(this.branch);


  }

  postBranch(model:BranchPostModel){
    this.branchService.create(model).subscribe(
      (response:any)=>{
        this.changeSuccessAndLoading(false, true);
        this.emptyFields();
      },(error:any)=>{
        if(error.status == 406){
          this.failMessage = 'failed to create branch, there is a branch with this name'
        }else{
          this.failMessage = 'failed to create branch, something goes wrong';
        }
        this.emptyFields()
        this.changeSuccessAndLoading(false, false);
      }
    )
  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }

  emptyFields(){
    this.BranchFormGroup.reset();
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }

}
