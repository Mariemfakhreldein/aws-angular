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
  id:string;
  isSuccess=false;
  isLoading=true;
  currentItem='branch';
  isBranchEmpty=false;
  action='edited';
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
          // alert(this.id)
          this.getBranchDetails(this.id);

        }
      );
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

    this.branch2.name = templateModel.name;
    this.branch2.address = templateModel.address;
    this.branch2.branchStatus = templateModel.value;

    this.updateBranch(this.id, this.branch2);


  }

  updateBranch(id:string, model:BranchPostModel){
    this.branchService.update(id, model).subscribe(
      (response:any)=>{
        console.log(response);
        //alert("Successfully updated");
        this.isLoading=false;
        this.isSuccess=true;
      },(error:any)=>{
        //console.log("fail Hello", error);
        this.isLoading=false;
        this.isSuccess=false;
      }
    )
  }

  getBranchDetails(id:string){
    // alert("here" + this.id)
    this.branchService.getBranch(id).subscribe(
      (response:any)=>{
        console.log(response);
        this.branch = response;
        console.log(response);
      },(error:any)=>{
        console.log("fail Hello", error);
      }
    )

  }

  getIsSuccess(): boolean{
        return this.isSuccess;
      }
}
