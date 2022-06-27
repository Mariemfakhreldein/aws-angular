import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchPostModel} from "../../../models/branch/branch.post.model";
import {BranchService} from "../../../services/branch.service";
import {ActivatedRoute} from "@angular/router";
import {BranchModel} from "../../../models/branch/branch.model";

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {

  BranchFormGroup: FormGroup = new FormGroup({});
  branch = new BranchModel();
  branch2 = new BranchPostModel();
  id: string;
  isSuccess = false;
  isLoading = true;
  isBranchEmpty = false;
  successMessage = 'branch is updated successfully';
  failMessage = ''

  constructor(private _formBuilder:FormBuilder,
              private branchService: BranchService,
              private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.BranchFormGroup=this._formBuilder.group({
      name:["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      value:[true,[Validators.required]],
      address:["",[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });

    this._activatedRoute.paramMap
      .subscribe(
        parms => {
          this.id = parms.get('id');
          this.getBranchDetails(this.id);
        }
      );
  }


  submitBtn() {
    this.isBranchEmpty=false;
    let txt = JSON.stringify(this.BranchFormGroup.value);
    let templateModel = JSON.parse(txt);
    this.branch2.name = templateModel.name;
    this.branch2.address = templateModel.address;
    this.branch2.branchStatus = templateModel.value;

    if(this.branch2.equals(this.branch)){
      this.failMessage = 'No modification in data';
      this.changeSuccessAndLoading(false, false);
    }else{
      this.updateBranch(this.id, this.branch2);
    }
  }

  updateBranch(id:string, model:BranchPostModel){
    this.branchService.update(id, model).subscribe(
      (response:any)=>{
        this.changeSuccessAndLoading(false, true)
      },(error:any)=>{
        this.failMessage = 'Something goes wrong';
        this.changeSuccessAndLoading(false, false)
      }
    )
  }

  getBranchDetails(id:string){
    this.branchService.getById(id).subscribe(
      (response:any)=>{
        this.branch = response;
        this.BranchFormGroup.patchValue({
          name: this.branch.name,
          address: this.branch.address
        });
      },(error:any)=>{
      }
    )
  }

  getIsSuccess(): boolean{
        return this.isSuccess;
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }
}
